/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";
	
	Template.tasks.events = {
        "click .delete": function (event) {
            event.preventDefault();
            Meteor.call("project_remove", this._id);
        }
	};
}(jQuery));
