/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

	Template.Modal_task_details.events = {
        "keypress .task_details_new_comment_text": function (event) {
            if (Utils.pressedEnter(event)) {
                event.preventDefault();
                $(".task_details_new_comment_save").click();
            }
        },
        "click .task_details_new_comment_save": function (event) {
            event.preventDefault();
            var comment, task, text, createdAt, createdBy;
            text = $(event.currentTarget).prev(".task_details_new_comment_text").val();
            task = Session.get("current_task");
            createdAt = new Date();
            createdBy = Meteor.userId();
            comment = {
                text: text,
                task: task,
                createdAt: createdAt,
                createdBy: createdBy
            };
            Task_Comments.insert(comment);
            $(event.currentTarget).prev(".task_details_new_comment_text").val("");
        }
    };
}(jQuery));