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
	Meteor.subscribe("current_confirmation_title", Session.get("current_confirmation_title"));
	Meteor.subscribe("current_confirmation_content", Session.get("current_confirmation_content"));
});

new_user = function () {
	return Session.get("new_user");
};

/* UTILS */
window.Utils = {
	onReady: function (fn) {
		setTimeout( function () {
			fn.call();
		}, 200);
	},
	dateFormat: function (date) {
		return moment(date).format("DD.MM.YY");
	},
	createRecord: function (collectionID, elementID) {
		var record, userID, timestamp, record_exists;
		userID = Meteor.userId();
	    record = {
	        user_id: userID,
	        collection_id: collectionID,
	        element_id: elementID
	    };
	    record_exists = Records.find({
	    	user_id: userID,
	    	collection_id: collectionID,
	    	element_id: elementID
	    }).count() > 0;
	    if (record_exists) {
	    	return Records.update(record, {$set: {createdAt: new Date()}});
	    } else {
	    	record.createdAt = new Date();
	    	return Records.insert(record);	
	    }
	},
	requireConfirmation: function (obj) {
		Session.set("current_confirmation_title", obj.title);
		Session.set("current_confirmation_content", obj.content);
		$(document).off("click", ".require_confirmation_confirm");
		if (obj.confirm && typeof obj.confirm === "function") {
			$(document).on("click", ".require_confirmation_confirm", function (event) {
				event.preventDefault();
				obj.confirm.call();
				$(this).parents(".modal").modal("hide");
			});
		}
		Meteor.defer(function () {
			$("#Modal_require_confirmation").modal("show");
		});
	},
	pressedEnter: function (event) {
		return (event.which || event.keyCode) === 13;
	}
};
/* COMPATIBILITY LAYER */
window.dateFormat = function (date) {
	return Utils.dateFormat(date);
}
window.pressedEnter = function (event) {
	return Utils.pressedEnter(event);
}

function createRecord (collectionID, elementID) {
	return Utils.createRecord(collectionID, elementID);
}