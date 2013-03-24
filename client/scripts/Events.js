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
    
    $(document).on("click", ".modal-cancel", function () {
        $(this).parents(".modal").modal("hide");
    });
    
    $(document).on("hide", ".modal", function () {
        switch ($(this).attr("id")) {
        case "Modal_":
            break;
        }
        Backbone.history.navigate("/");
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
            createNewChat(this._id);
        }
    };

    Template.tasks.events = {
        "click a.mark_done": function (event) {
            event.preventDefault();
            Tasks.update(this, {$set: {completed: true}});
        },
        "click a.mark_undone": function (event) {
            event.preventDefault();
            Tasks.update(this, {$set: {completed: false}});
        },
        "click a.delete": function (event) {
            event.preventDefault();
            Tasks.remove(this);
        }
    };

    Template.new_task.events = {
        "submit form": function (event) {
            event.preventDefault();
            var projectID, new_task_title, new_task;
            projectID = Session.get("current_project");
            new_task_title = $("#new_task_title").val();
            new_task = {
                title: new_task_title,
                project: projectID,
                completed: false,
                createdBy: Meteor.userId(),
                createdAt: (new Date()).getTime()
            };
            Tasks.insert(new_task);
            
            $("#new_task_title").val("");
        }
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

    Template.Chat_window.events = {
        "click .chat_window_title": function (event) {
            var $chat_window = $(event.target).parent(".chat_window");
            if ($chat_window.hasClass("opened")) {
                closeSpecificChat(this._id);
            } else {
                openSpecificChat(this._id);
            }
            // $chat_window = $chat_window.hasClass("opened") ? $chat_window.removeClass("opened") : $chat_window.addClass("opened");
        },
        "focus .chat_window_new_text": function (event) {
            console.log(this);
            // createRecord("messages", this._id);
        },
        "submit form": function (event) {
            
        },
        "keydown textarea": function (event) {
            var pressedEnter, pressedEsc, new_chat_message, new_chat_message_text;
            pressedEnter = event.which === 13;
            pressedEsc = event.which === 27;
            if (pressedEnter) {
                event.preventDefault();
                
                new_chat_message_text = $(event.target).val();
                $(event.target).val("");
                new_chat_message = {
                    from: Meteor.userId(),
                    to: this._id,
                    text: new_chat_message_text
                };
                Messages.insert(new_chat_message);
            } else if (pressedEsc) {
                removeChat(this._id);
            }
        }
    };
}(jQuery));