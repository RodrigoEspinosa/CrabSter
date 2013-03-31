/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";
    
	Template.Modal_task_details.task_title = function () {
		var t = Tasks.findOne({_id: Session.get("current_task")});
		if( t )
			return t.title;
	};
	Template.Modal_task_details.comments = function () {
		var t = Task_Comments.find({task: Session.get("current_task")}, function (comment) {
			var user = Meteor.user.findOne({_id: comment.createdBy});
			if (user) {
				comment.createdBy = user.name + " " + user.lastname;
				return comment;
			}
		});
		// t.forEach(function (task) {
		// 	task.createdBy = Meteor.users.findOne({_id: task.createdBy}).profile.name;
		// 	return task;
		// });
		return t;
	};
}(jQuery));