/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

	Template.Modal_task_details.task_title = function () {
		var t = Tasks.findOne({_id: Session.get("current_task")});
		if (t)
			return t.title;
	};
	Template.Modal_task_details.createdAt = function () {
		var t = Tasks.findOne({_id: Session.get("current_task")});
		if (t)
			return Utils.dateFormat(t.createdAt);
	};
	Template.Modal_task_details.createdAtAgo = function () {
		var t = Tasks.findOne({_id: Session.get("current_task")});
		if (t)
			return moment(t.createdAt).fromNow();
	};
	Template.Modal_task_details.createdBy = function () {
		var t = Tasks.findOne({_id: Session.get("current_task")}), user;
		if (t) {
			user = Meteor.users.findOne({_id: t.createdBy});
			if (user)
				return user.profile.name + " " + user.profile.lastname;
		}
	};
	Template.Modal_task_details.comments = function () {
		var t = Task_Comments.find({task: Session.get("current_task")}, {
			transform: function (comment) {
				var user = Meteor.users.findOne({_id: comment.createdBy});
				if (user) {
					comment.createdBy = user.profile.name + " " + user.profile.lastname;
					return comment;
				}
				return comment;
			}
		});
		return t;
	};
}(jQuery));