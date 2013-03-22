Clients 	  = new Meteor.Collection("clients");
Projects 	  = new Meteor.Collection("projects");
Tasks 		  = new Meteor.Collection("tasks");
Messages 	  = new Meteor.Collection("messages");
Task_Comments = new Meteor.Collection("task_comments");

Meteor.publish("clients", function () {
	return Clients.find({});
});

Meteor.publish("projects", function () {
	return Projects.find({});
});

Meteor.publish("tasks", function () {
	return Tasks.find({});
});

Meteor.publish("messages", function () {
	return Messages.find({});
});

Meteor.publish("users", function () {
	return Meteor.users.find({});
});

Meteor.publish("task_comments", function () {
	return Task_Comments.find({});
});

Clients.allow({
	insert: function(userID, taskID) {
		return true;
	},
	update: function(userID, tasksID) {
		return true;
	},
	remove: function(userID, tasksID) {
		return true;
	}
});

Tasks.allow({
	insert: function(userID, taskID) {
		return true;
	},
	update: function(userID, tasksID) {
		return true;
	},
	remove: function(userID, tasksID) {
		return true;
	}
});

Projects.allow({
	insert: function(userID, taskID) {
		return true;
	},
	update: function(userID, tasksID) {
		return true;
	},
	remove: function(userID, tasksID) {
		return true;
	}
});

Messages.allow({
	insert: function(userID, taskID) {
		return true;
	},
	update: function(userID, tasksID) {
		return true;
	},
	remove: function(userID, tasksID) {
		return true;
	}
});

Task_Comments.allow({
	insert: function(userID, taskID) {
		return true;
	},
	update: function(userID, tasksID) {
		return true;
	},
	remove: function(userID, tasksID) {
		return true;
	}
});

Accounts.config({
	sendVerificationEmail: false,
	forbidClientAccountCreation: false
});

// Accounts.validateNewUser(function (user) {
// 	if (user.email && user.email.length >= 3)
// 		return true;
// 	throw new Meteor.Error(403, "Username must have at least 3 characters");
// });

// Meteor.publish("tasks", function() {
// 	return Tasks.find();
// });

// Meteor.publish("parties", function () {
//   return Parties.find({$or: [{"public": true},
//                              {invited: this.userId},
//                              {owner: this.userId}]});
// });