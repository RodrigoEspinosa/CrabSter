Clients 	  	= new Meteor.Collection("clients");
Projects 	  	= new Meteor.Collection("projects");
Tasks 		  	= new Meteor.Collection("tasks");
Messages 	  	= new Meteor.Collection("messages");
Task_Comments 	= new Meteor.Collection("task_comments");
Records			= new Meteor.Collection("records");

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
	return Meteor.users.find({
		
	}, {
		transform: function(user) {
			user.profile.image = "img/default.jpg";
			return user;
		}
	});
});

Meteor.publish("task_comments", function () {
	return Task_Comments.find({});
});

Meteor.publish("records", function () {
	return Records.find({});
});

Meteor.methods({
	"md5_encode": function (string) {
		// return hex_md5(string);
	},
	"gravatar_url": function (gravatarMail, gravatarSize) {
		var gravatarURL, gravatarHash;
		gravatarURL  = "http://www.gravatar.com/avatar/";
		// gravatarHash = this.md5_encode(gravatarMail);
		gravatarHash = "71f946b4fdeb8a14e43297b2708e4c3a";
		gravatarSize = "?s="+gravatarSize;
		return gravatarURL+gravatarHash+gravatarSize;
	},
	"user_img": function (userID, gravatarSize) {
		// var gravatar, user;
		// user = Meteor.findOne({_id: userID}).fetch();
		// if( user.profile.gravatar ){
		// 	this.gravatar_url(user.profile.gravatar, gravatarSize);
		// }else{
		// 	return false;
		// }
	},
	"project_remove": function (projectID) {
		Tasks.remove({
        	project: projectID
        });
        Projects.remove({
        	_id: projectID
        });
	}
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

Records.allow({
	insert: function(userID, taskID) {
		return true;
	},
	update: function(userID, tasksID) {
		return true;
	},
	remove: function(userID, tasksID) {
		return false;
	}
});

Accounts.config({
	sendVerificationEmail: true,
	forbidClientAccountCreation: false
});

/*Accounts.validateNewUser(function (user) {
	var emailAt;
	if (user.email && user.email.length >= 3) {
		if (document.location.host(emailAt) !== null) {
			emailAt = user.email.split("@")[1];
			return true;
		} else {
			throw new Meteor.Error(403, "Email doesn't match this domain");
		}
	} else {
		throw new Meteor.Error(403, "Email must have at least 3 characters");
	}
});*/

// Meteor.publish("tasks", function() {
// 	return Tasks.find();
// });

// Meteor.publish("parties", function () {
//   return Parties.find({$or: [{"public": true},
//                              {invited: this.userId},
//                              {owner: this.userId}]});
// });