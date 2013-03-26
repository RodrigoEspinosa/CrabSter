Clients 		= new Meteor.Collection("clients");
Projects 		= new Meteor.Collection("projects");
Tasks 			= new Meteor.Collection("tasks");
Messages 		= new Meteor.Collection("messages");
Task_Comments 	= new Meteor.Collection("task_comments");
Records 		= new Meteor.Collection("records");

Meteor.autorun(function () {
	Meteor.subscribe("clients");
	Meteor.subscribe("projects");
	Meteor.subscribe("tasks");
	Meteor.subscribe("messages");
	Meteor.subscribe("users");
	Meteor.subscribe("task_comments");
	Meteor.subscribe("records");
	Meteor.subscribe("current_task", Session.get("current_task"));
	Meteor.subscribe("current_project", Session.get("current_project"));
	Meteor.subscribe("current_editing", Session.get("current_editing"));
	Meteor.subscribe("current_chats", Session.get("current_chats"));
});

new_user = function () {
	return Session.get("new_user");
};

Template.aside.location = function () {
	return "Montevideo";
};

Template.aside.date = function () {
	var d = new Date();
	return d.getDate()+"."+(d.getMonth()+1)+"."+(d.getFullYear()).toString().substr(2);
};

Template.aside.clients = function () {
	var clients = Clients.find({}).fetch();
	// Get project clients
	for( client in clients ){
		var c = clients[client];
		clients[client].projects = Projects.find({client: c._id}).fetch();
	}
	return clients;
};

Template.aside.user_list = function () {
	var users = Meteor.users.find({
		_id: {
			$not: Meteor.userId()
		}
	});
	return users;
};

Template.main.show_tasks = function () {
	if( Session.get("current_project") )
		return true;
	return false;
};

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

Template.tasks.allDone = function () {
	var filter = {};
	filter = {
		project: Session.get("current_project"),
		completed: false
	};
	return (Tasks.find(filter).count() > 0) ? false : true;
};

Template.tasks.tasks = function () {
	var filter = {};
	if( Session.get("current_project") != null ){
		filter.project = Session.get("current_project");
	}
	return Tasks.find(filter);
};

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

Template.Modal_edit_client.edit_client_name = function () {
	var c = Clients.findOne({_id: Session.get("current_editing")});
	if( c )
		return c.name;
};

Template.Modal_task_details.task_title = function () {
	var t = Tasks.findOne({_id: Session.get("current_task")});
	if( t )
		return t.title;
};

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

Template.Chat_dock.chats = function () {
	var usersToChat = Session.get("current_chats");
	var usersChats = new Array();
	for (index in usersToChat) {
		var userID 	= usersToChat[index];
		var opened  = $.inArray(userID, Session.get("opened_chats"));
		var user 	= Meteor.users.findOne({_id: userID});
		var title 	= user.profile.name + " " + ((user.profile.lastname) ? user.profile.lastname : "");
		var messages= Messages.find({
			$or: [
				{$and: [{from: userID}, {to: Meteor.userId()}]},
				{$and: [{from: Meteor.userId()}, {to: userID}]}
			]
		}).fetch();
		for( m in messages ) {
			messages[m].createdBySelfUser = messages[m].from === Meteor.userId();
		}
		usersChats[index] = {
			_id: userID,
			opened: (opened >= 0) ? "opened" : false,
			title: title,
			messages: messages
		};
	}
	return usersChats;
};

// Template.Chat_dock.preserve([".chat_dock", ".chat_window"]);

/* UTILS */
function dateFormat (dateNumber) {
	var d;
	d = new Date(dateNumber);
	return d.getDate()+"."+(d.getMonth()+1)+"."+(d.getFullYear().toString().substr(2))
}
function createRecord (collectionID, elementID) {
	var record, userID, timestamp;
	timestamp = new Date();
	userID = Meteor.userId();
    record = {
        user_id: userID,
        collection_id: collectionID,
        element_id: elementID,
        createdAt: timestamp
    };
    return Records.insert(record);
}