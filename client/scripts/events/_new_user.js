/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

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
}(jQuery));