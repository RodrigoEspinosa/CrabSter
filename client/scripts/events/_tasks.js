/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";
	
	Template.tasks.events = {
        "click .delete": function (event) {
            event.preventDefault();
            var projectID = Session.get("current_project");
            Utils.requireConfirmation({
            	title: "Are you sure?",
            	content: "This is kind'a serious!",
            	confirm: function () {
            		Meteor.call("project_remove", projectID);
            		Session.set("current_project", null);
            	},
            	cancel: function () {

            	}
            });
            
        }
	};
}(jQuery));
