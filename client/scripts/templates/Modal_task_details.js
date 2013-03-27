Template.Modal_task_details.comments = function () {
	var t = Task_Comments.find({task: Session.get("current_task")})
	t.forEach(function (task) {
		task.createdBy = Meteor.users.findOne({_id: task.createdBy}).profile.name;
		return task;
	});
	return t;
	// var t = Task_Comments.find({task: Session.get("current_task")}).fetch();
	// for( index in t ) {
	// 	var user = Meteor.users.findOne({_id: t[index].createdBy}).profile.name;
	// 	t[index].createdBy = user;
	// }
	// if( t )
	// 	return t;
};
Template.Modal_task_details.task_title = function () {
	var t = Tasks.findOne({_id: Session.get("current_task")});
	if( t )
		return t.title;
};