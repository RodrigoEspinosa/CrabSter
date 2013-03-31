/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

	Template.Modal_edit_project.events = {
        "submit form": function (event) {
            event.preventDefault();
            $("#edit_project_save").click();
        },
        "click #edit_project_save": function (event) {
            event.preventDefault();
            var edit_project_name, edit_project_deadline, edit_project;
            edit_project_name = $("#edit_project_name").val();
            edit_project_deadline = moment($("#edit_project_deadline").val(), "DD/MM/YYYY").toDate();
            edit_project = {
                name: edit_project_name,
                // client: Session.get("partner_id"),
                deadline: edit_project_deadline,
                updatedBy: Meteor.userId(),
                updatedAt: (new Date()).getTime()
            };
            Projects.update({_id: Session.get("current_editing")}, {$set: edit_project});

            edit_project_name = $("#edit_project_name").val("");
            $("#Modal_edit_project").modal('hide');
        }
    };

    Template.Modal_edit_project.created = function () {
        Template.Modal_edit_project.rendered = function () {
            $("#edit_project_deadline").datepicker({
                format: "dd/mm/yyyy"
            });
        };
    };
}(jQuery));