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