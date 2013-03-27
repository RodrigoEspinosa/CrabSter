/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

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
}(jQuery));