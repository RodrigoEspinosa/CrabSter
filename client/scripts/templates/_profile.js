Template.profile.pendingTasks = function () {
	var filter = {
		$and: [
			{$or: [
				{ createdBy: Meteor.userId() },
				{ assignedTo: Meteor.userId() }
			]},
			{
				completed: false
			}
		]
	};
	return Tasks.find(filter).count();
};
Template.profile.doneTasks = function () {
	var filter = {
		$and: [
			{$or: [
				{ createdBy: Meteor.userId() },
				{ assignedTo: Meteor.userId() }
			]},
			{
				completed: true
			}
		]
	};
	return Tasks.find(filter).count();
};
Template.profile.doneProjects = function () {
	return "X";
};