/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

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
            $("#new_task_deadline").datepicker({
                format: "dd/mm/yyyy"
            });
            $("#new_task_assignTo").typeahead({
                source: function (query, process) {
                    var users = [], re;
                    // re = new RegExp(query, "i");
                    // console.log(re);
                    Meteor.users.find({
                        $or: [
                            {profile: {name: query } },
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
}(jQuery));