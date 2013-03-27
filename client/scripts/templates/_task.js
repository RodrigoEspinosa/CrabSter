Template.task.createdBy = function () {
	return Meteor.users.findOne({_id: this.createdBy});
};

Template.task.assignedTo = function () {
	return Meteor.users.findOne({_id: this.assignedTo});
};

Template.task.date = function () {
	return dateFormat(this.createdAt);
};

Template.task.dateFromNow = function () {
	return moment(this.createdAt).fromNow();
};