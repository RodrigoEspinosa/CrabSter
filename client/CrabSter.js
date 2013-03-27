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