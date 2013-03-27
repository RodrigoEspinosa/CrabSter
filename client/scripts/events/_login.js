/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

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
}(jQuery));