/*globals Backbone, Router, jQuery, Meteor, Template, Tasks, Clients, Session */
/*jslint browser: true */
(function ($) {
    "use strict";
    
    var TasksRouter, Router;
    
    TasksRouter = Backbone.Router.extend({
        routes: {
            "logout": "userLogout",
            "project/:projectID": "getProjectTasks",
            "new/:collection": "newCollectionModal",
            "task/:taskID": "taskDetails",
            "new/:collection/:partnerID": "newCollectionModalWithPartner",
            "edit/:collection/:collectionID": "editCollectionModal"
        },
        userLogout: function () {
            Meteor.logout(function (Error) {
                if( Error ) {
                    alert( Error.response );
                } else {
                    Backbone.history.navigate("/");
                }
            });
        },
        getProjectTasks: function (projectID) {
            Session.set("current_project", projectID);
        },
        newCollectionModal: function (collection) {
            switch (collection) {
            case "client":
                Template.Modal_new_client.rendered = function () {
                    $("#Modal_new_client").modal("show");
                }
                break;
            case "project":
                Template.Modal_new_project.rendered = function () {
                    $("#Modal_new_project").modal("show");    
                }
                break;
            case "user":
                Session.set("new_user", true);
                break;
            }
        },
        taskDetails: function (taskID) {
            Session.set("current_task", taskID);
            Template.Modal_task_details.rendered = function () {
                $("#Modal_task_details").modal("show");
            }
        },
        newCollectionModalWithPartner: function (collection, partnerID) {
            Session.set("partner_id", partnerID);
            switch (collection) {
            case "project":
                Template.Modal_new_project.rendered = function () {
                    $("#Modal_new_project").modal("show");                    
                }
                break;
            }
        },
        editCollectionModal: function (collection, collectionID) {
            Session.set("current_editing", collectionID);
            switch (collection) {
            case "client":
                Template.Modal_edit_client.rendered = function () {
                    $("#Modal_edit_client").modal("show");    
                }
                break;
            }
        }
    });

    Router = new TasksRouter();

    Meteor.startup(function () {
        Backbone.history.start({pushState: true});

        $(document).on("click", "a:not[data-bypass]", function(event) {
            event.preventDefault();
            var href, protocol;
            href = $(this).attr("href");
            Router.history.navigate(href, true);
        });
    });
}(jQuery));
