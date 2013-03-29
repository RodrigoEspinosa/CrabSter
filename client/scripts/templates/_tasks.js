Template.tasks.project_name = function () {
	var project;
	project = Projects.find({"_id": Session.get("current_project")}).fetch();
	if( project[0] )
		return project[0].name;
};

Template.tasks.createdAt = function () {
	var project, date;
	project = Projects.find({"_id": Session.get("current_project")}).fetch();
	if( project[0] ) {
		var date = project[0].createdAt;
		return dateFormat(date);
	}
};

Template.tasks.deadline = function () {
	var project, date;
	project = Projects.find({"_id": Session.get("current_project")}).fetch();
	if( project[0] && project[0].deadline ) {
		var date = project[0].deadline;
		return dateFormat(date);
	}
};

Template.tasks.dueDate = function () {
	var project, date;
	project = Projects.find({"_id": Session.get("current_project")}).fetch();
	if( project[0] && project[0].deadline ) {
		var date = project[0].createdAt;
		return moment(date).fromNow();
	}
};

Template.tasks.allDone = function () {
	var filter = {};
	filter = {
		project: Session.get("current_project"),
		completed: false
	};
	if (Tasks.find({project: Session.get("current_project")}).count() === 0)
		return false;
	return (Tasks.find(filter).count() > 0) ? false : true;
};

Template.tasks.tasks = function () {
	var filter = {};
	if( Session.get("current_project") != null ){
		filter.project = Session.get("current_project");
	}
	return Tasks.find(filter);
};