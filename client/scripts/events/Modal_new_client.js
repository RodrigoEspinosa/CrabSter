/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

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
    
            $("#new_client_name").val("")
            $("#Modal_new_client").modal("hide");
        }
    };
}(jQuery));