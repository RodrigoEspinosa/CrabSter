/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

    Template.tasks.events = {
        "click document": function (event) {
            $(".task_title_editing").blur();
        },
        "dblclick .task_title": function (event) {
            var $this = $(event.target);
            $this.replaceWith("<input type='text' class='task_title_editing' value='" + $this.text() + "'>");
            $(".task_title_editing").focus();
        },
        "keydown .task_title_editing": function (event) {
            var pressedEnter, pressedEsc, pressedTab;
            pressedEnter = event.which === 13 || event.keyCode === 13;
            pressedEsc = event.keyCode === 27 || event.which === 27;
            pressedTab = event.keyCode === 9 || event.which === 9;
            if (pressedEnter) {
                event.preventDefault();
                $(event.target).blur();
            } else if (pressedEsc) {
                event.preventDefault();
                $(event.target).replaceWith("<span class='task_title'>" + this.text + "</span>");
            } else if (pressedTab) {
                event.preventDefault();
                $(event.target).parent(".task").next(".task").children(".task_title").dblclick();
            }
        },
        "blur .task_title_editing": function (event) {
            var $this = $(event.target);
            Tasks.update({_id: this._id}, {$set: {title: $this.val()}});
            $(event.target).replaceWith("<span class='task_title'>" + $this.val() + "</span>");
        },
        "click .mark_done": function (event) {
            event.preventDefault();
            Tasks.update({_id: this._id}, {$set: {completed: true}});
        },
        "click .mark_undone": function (event) {
            event.preventDefault();
            Tasks.update({_id: this._id}, {$set: {completed: false}});
        },
        "click .delete": function (event) {
            event.preventDefault();
            Tasks.remove({_id: this._id});
        }
    };
}(jQuery));