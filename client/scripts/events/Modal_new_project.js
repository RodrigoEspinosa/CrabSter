/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

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
}(jQuery));