/*globals jQuery, _, Chat */
/*jslint browser: true */
(function ($) {
	"use strict";

	window.Chat =  {
		create: function (userID) {
			var current_chats;
			current_chats = Session.get("current_chats");
			if (current_chats && current_chats[0]) {
				if ($.inArray(userID, current_chats) >= 0) {
					return true;
				} else {
					current_chats.push(userID);
				}
			} else {
				current_chats = [userID];
			}
			Session.set("current_chats", current_chats);

			Chat.open(userID);

			return current_chats;
		},
		remove: function (chatID) {
			var current_chats;
			if (current_chats && current_chats[0]) {
				Chat.close(chatID);
				current_chats = _.without(current_chats, chatID);
			}
			Session.set("current_chats", current_chats);
			return current_chats;	
		},
		open: function (chatID) {
			var opened_chats;
			opened_chats = Session.get("opened_chats");
			if (opened_chats && opened_chats[0]) {
				if ($.inArray(chatID, opened_chats) >= 0) {
					return true;
				} else {
					opened_chats.push(chatID);
				}
			} else {
				opened_chats = [chatID];
			}
			Session.set("opened_chats", opened_chats);
			if (arguments && arguments[1] && typeof arguments[1] === "function") {
				arguments[1].call();
			}
			return opened_chats;
		},
		close: function (chatID) {
			var opened_chats = Session.get("opened_chats");
			if (opened_chats && opened_chats[0]) {
				opened_chats = _.without(opened_chats, chatID);
			}
			Session.set("opened_chats", opened_chats);
			return opened_chats;
		}
	};
}(jQuery));