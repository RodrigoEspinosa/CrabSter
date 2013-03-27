/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";
    
    $(document).on("click", ".login-link-text, #login-name-link", function () {
        if ($("#login-dropdown-list").hasClass("visible")) {
            $("#login-dropdown-list").removeClass("visible");
        } else {
            $("#login-dropdown-list").addClass("visible");
        }
    });

    $(document).on("ready", function () {
        $(document).tooltip({
            selector: "a[title], span[title], img[title], div[title]"
        });
    });
    
    $(document).on("click", ".modal-cancel", function () {
        $(this).parents(".modal").modal("hide");
    });
    
    $(document).on("hide", ".modal", function () {
        switch ($(this).attr("id")) {
        case "Modal_task_details":
            Session.set("current_task", null);
            break;
        }
        // Backbone.history.navigate("/");
    });

    Template.login.events = {
        "keypress .login_form": function (event) {
            if (event.which === 13) {
                event.preventDefault();
                var login_form_email, login_form_password;
                login_form_email = $("#login_form_email").val();
                login_form_password = $("#login_form_password").val();
                Meteor.loginWithPassword(login_form_email, login_form_password, function (Error) {
                    if (Error) {
                        console.log(Error.error + ": " + Error.reason + ". " + Error.description);
                        alert(Error.reason);
                    } else {
                        Backbone.history.navigate("/");
                    }
                });
            }
        }
    };

    Template.new_user.events = {
        "keypress .new_user_form": function (event) {
            if (event.which === 13) {
                event.preventDefault();
                $(document).find(".new_user_register").click();
            }
        },
        "click .new_user_register": function (event) {
            event.preventDefault();
            var new_user_email, new_user_password, new_user_name, new_user_lastname;
            new_user_email = $("#new_user_email").val();
            new_user_password = $("#new_user_password").val();
            new_user_name = $("#new_user_name").val();
            new_user_lastname = $("#new_user_lastname").val();
            Accounts.createUser({
                email: new_user_email,
                password: new_user_password,
                profile: {
                    name: new_user_name,
                    lastname: new_user_lastname
                }
            }, function (Error) {
                if (Error) {
                    console.log(Error.error + ": " + Error.reason + ". " + Error.description);
                    alert(Error.reason);
                } else {
                    Backbone.history.navigate("/");
                }
            });
        }
    };

    Template.aside.events = {
        "click .aside_user_list li": function (event) {
            Chat.create(this._id);
        }
    };

    Template.tasks.events = {
        "click document": function (event) {
            $(".task_title_editing").blur();
        },
        "dblclick .task_title": function (event) {
            var $this = $(event.target);
            $this.replaceWith("<input type='text' class='task_title_editing' value='" + $this.text() + "'>");
            $(".task_title_editing").focus();
        },
        "keypress .task_title_editing": function (event) {
            if (event.which === 13) {
                event.preventDefault();
                $(event.target).blur();
            } else if (event.which === 27) {
                event.preventDefault();
                $(event.target).replaceWith("<span class='task_title'>" + this.text + "</span>");
            }
        },
        "blur .task_title_editing": function (event) {
            var $this = $(event.target);
            Tasks.update({_id: this._id}, {$set: {title: $this.val()}});
            $(event.target).replaceWith("<span class='task_title'>" + $this.val() + "</span>");
        },
        "click .mark_done": function (event) {
            event.preventDefault();
            Tasks.update({_id: this._id}, {$set: {completed: true}});
        },
        "click .mark_undone": function (event) {
            event.preventDefault();
            Tasks.update({_id: this._id}, {$set: {completed: false}});
        },
        "click .delete": function (event) {
            event.preventDefault();
            Tasks.remove({_id: this._id});
        }
    };

    Template.new_task.events = {
        "submit form": function (event) {
            event.preventDefault();
            var projectID, new_task_title, new_task_assignTo, new_task_deadline, new_task;
            projectID = Session.get("current_project");
            new_task_title = $("#new_task_title").val();
            new_task_assignTo = ($("#new_task_assignTo").val()) ? $("#new_task_assignTo").val() : "";
            new_task_deadline = ($("#new_task_deadline").val()) ? $("#new_task_deadline").val() : "";
            new_task = {
                title: new_task_title,
                project: projectID,
                completed: false,
                assignTo: new_task_assignTo,
                new_task_deadline: new_task_deadline,
                createdBy: Meteor.userId(),
                createdAt: (new Date()).getTime()
            };
            Tasks.insert(new_task);
            
            $("#new_task_title").val("");
            $("#new_task_assignTo").val("");
            $("#new_task_deadline").val("");
        }
    };

    Template.new_task.created = function () {
        Template.new_task.rendered = function () {
            $("#new_task_deadline").datepicker();
            $("#new_task_assignTo").typeahead({
                source: function (query, process) {
                    var users = [];
                    Meteor.users.find({
                        $or: [
                            {profile: {name: query} },
                            {profile: {lastname: query} }
                        ]
                    }).forEach(function (user) {
                        if( user.profile.lastname )
                            users.push(user.profile.name + " " + user.profile.lastname)
                        else
                            users.push(user.profile.name);
                    });
                    return users;
                }
            });
        };
    };
    
    Template.header.events = {
        "click .user_actions": function (event) {
            var $dropmenu, $self;
            event.preventDefault();
            $dropmenu = $(".dropmenu");
            $self = $(".user_actions");
            $self = $self.hasClass("active") ? $self.removeClass("active") : $self.addClass("active");
            $dropmenu = $dropmenu.hasClass("active") ? $dropmenu.removeClass("active") : $dropmenu.addClass("active");
        }
    };

    Template.Modal_new_client.events = {
        "submit form": function (event) {
            event.preventDefault();
            $("#new_client_save").click();
        },
        "click #new_client_save": function (event) {
            event.preventDefault();
            var new_client_name, new_client;
            new_client_name = $("#new_client_name").val();
            new_client = {
                name: new_client_name,
                createdBy: Meteor.userId(),
                createdAt: (new Date()).getTime()
            };
            Clients.insert(new_client);
    
            $("#Modal_new_client").modal('hide');
        }
    };

    Template.Modal_new_project.events = {
        "submit form": function (event) {
            event.preventDefault();
            $("#new_project_save").click();
        },
        "click #new_project_save": function (event) {
            event.preventDefault();
            var new_project_name, new_project;
            new_project_name = $("#new_project_name").val();
            new_project = {
                name: new_project_name,
                client: Session.get("partner_id"),
                createdBy: Meteor.userId(),
                createdAt: (new Date()).getTime()
            };
            Projects.insert(new_project);

            $("#Modal_new_project").modal('hide');
        }
    };
    
    Template.Modal_edit_client.events = {
        "submit form": function (event) {
            event.preventDefault();
            $("#edit_client_save").click();
        },
        "click #edit_client_save": function (event) {
            event.preventDefault();
            var edit_client_name, edit_client;
            edit_client_name = $("#edit_client_name").val();
            edit_client = {
                name: edit_client_name,
                updatedBy: Meteor.userId(),
                updatedAt: (new Date()).getTime()
            };
            Clients.update({"_id": Session.get("current_editing")}, {"$set": edit_client});
    
            $("#Modal_edit_client").modal('hide');
        }
    };

    Template.Modal_task_details.events = {
        "keypress .task_details_new_comment_text": function (event) {

        },
        "click .task_details_new_comment_save": function (event) {
            var comment, task, text, createdAt, createdBy;
            text = $(event.target).prev(".task_details_new_comment_text").val();
            task = Session.get("current_task");
            createdAt = new Date();
            createdBy = Meteor.userId();
            comment = {
                text: text,
                task: task,
                createdAt: createdAt,
                createdBy: createdBy
            };
            Task_Comments.insert(comment);
            $(event.target).prev(".task_details_new_comment_text").val("");
        }
    };

    Template.Chat_window.created = function () {
        Template.Chat_window.rendered = function () {
            
        };
    };

    Template.Chat_window.events = {
        "click .chat_window_title": function (event) {
            var $chat_window = $(event.target).parent(".chat_window");
            if ($chat_window.hasClass("opened")) {
                Chat.close(this._id);
            } else {
                Chat.open(this._id, function () {
                    $(event.target).parent(".chat_window").find("textarea").focus();
                });
            }
        },
        "focus .chat_window_new_text": function (event) {
            console.log(this);
            // createRecord("messages", this._id);
        },
        "submit form": function (event) {
            event.preventDefault();
        },
        "keypress textarea": function (event) {
            var pressedEnter, pressedEsc, new_chat_message, new_chat_message_text, chat_window_messages;
            pressedEnter = event.which === 13;
            pressedEsc = event.which === 27;
            if (pressedEnter) {
                event.preventDefault();
                
                new_chat_message_text = $(event.target).val();
                $(event.target).val("");
                new_chat_message = {
                    from: Meteor.userId(),
                    to: this._id,
                    text: new_chat_message_text,
                    createdAt: new Date()
                };
                
                Messages.insert(new_chat_message);

                chat_window_messages = $(event.target).parents(".chat_window_messages");
                $(event.target).focus();
                // chat_window_messages.scroll(chat_window_messages.children(".chat_window_message_text").last().scrollTop());
            } else if (pressedEsc) {
                event.preventDefault();
                Chat.remove(this._id);
            }
        }
    };
}(jQuery));