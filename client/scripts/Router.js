/*globals alert, Backbone, Router, jQuery, Meteor, Template, Tasks, Clients, Session */
/*jslint browser: true */
(function ($) {
    "use strict";
    
    var TasksRouter, Router;
    
    TasksRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            "logout": "userLogout",
            "project/:projectID": "getProjectTasks",
            "new/:collection": "newCollectionModal",
            "task/:taskID": "taskDetails",
            "new/:collection/:partnerID": "newCollectionModalWithPartner",
            "edit/:collection/:collectionID": "editCollectionModal"
        },
        index: function () {
            Session.set("current_page", "");
            Session.set("current_task", null);
            Session.set("partner_id", null);
            Session.set("current_project", null);
            Session.set("current_editing", null);
            // Aca podria haber un Session.set("new_user", false);
        },
        userLogout: function () {
            Meteor.logout(function (Error) {
                if (Error) {
                    alert(Error.response);
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
                // $("#Modal_new_client").modal("show");
                // Template.Modal_new_client.rendered = function () {
                //     $("#Modal_new_client").modal("show");
                // };
                break;
            case "project":
                Session.set("current_page", "new_project");
                // $("#Modal_new_project").modal("show");
                // Template.Modal_new_project.rendered = function () {
                //     $("#Modal_new_project").modal("show");
                // };
                break;
            case "user":
                Session.set("new_user", true);
                break;
            }
        },
        taskDetails: function (taskID) {
            Session.set("current_task", taskID);
            Utils.onReady(function () {
                $("#Modal_task_details").modal("show");
            });
        },
        newCollectionModalWithPartner: function (collection, partnerID) {
            Session.set("partner_id", partnerID);
            switch (collection) {
            case "project":
                Utils.onReady(function () {
                    $("#Modal_new_project").modal("show");
                });
                break;
            }
        },
        editCollectionModal: function (collection, collectionID) {
            Session.set("current_editing", collectionID);
            switch (collection) {
            case "project":
                Utils.onReady(function () {
                    $("#Modal_edit_project").modal("show");
                });
                break;
            case "client":
                Utils.onReady(function () {
                    $("#Modal_edit_client").modal("show");
                });
                break;
            }
        }
    });

    Router = new TasksRouter();

    Meteor.startup(function () {
        Backbone.history.start({pushState: true});

        $(document).on("click", "a", function (event) {
            event.preventDefault();
            var href;
            href = $(this).attr("href");
            Backbone.history.navigate(href, {
                trigger: true
            });
        });
    });
}(jQuery));
