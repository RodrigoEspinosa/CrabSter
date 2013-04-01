/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

	Template.Chat_window.created = function () {
        Template.Chat_window.rendered = function () {
            
        };
    };

    Template.Chat_window.events = {
        "click .chat_window_title": function (event) {
            var $chat_window = $(event.target).parent(".chat_window");
            if ($chat_window.hasClass("opened")) {
                Chat.close(this._id);
            } else {
                Chat.open(this._id, function () {
                    $(event.target).parent(".chat_window").find("textarea").focus();
                });
            }
        },
        "focus .chat_window_new_text": function (event) {
            Utils.createRecord("messages", this._id);
        },
        "submit form": function (event) {
            event.preventDefault();
        },
        "keydown textarea": function (event) {
            var pressedEnter, pressedEsc, new_chat_message, new_chat_message_text, chat_window_messages;
            pressedEnter = event.which === 13 || event.keyCode === 13;
            pressedEsc = event.which === 27 || event.keyCode === 27;
            if (pressedEnter) {
                event.preventDefault();
                
                new_chat_message_text = $(event.target).val();
                $(event.target).val("");
                new_chat_message = {
                    from: Meteor.userId(),
                    to: this._id,
                    text: new_chat_message_text,
                    readed: false,
                    createdAt: new Date()
                };
                
                Messages.insert(new_chat_message);

                chat_window_messages = $(event.target).parents(".chat_window_messages");
                $(event.target).focus();
                // chat_window_messages.scroll(chat_window_messages.children(".chat_window_message_text").last().scrollTop());
            } else if (pressedEsc) {
                event.preventDefault();
                Chat.remove(this._id);
            }
        }
    };
}(jQuery));