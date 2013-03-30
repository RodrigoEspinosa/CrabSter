/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

    $(document).on("edit_task_title", ".task_title", function (event) {
        var $this = $(this);
        $this.replaceWith("<input type='text' class='task_title_editing' value='" + $this.text() + "'>");
        $(".task_title_editing").focus();
    });

    Template.task.events = {
        "click document": function (event) {
            $(".task_title_editing").blur();
        },
        "dblclick .task_title": function (event) {
            var $this = $(event.target);
            $this.replaceWith("<input type='text' class='task_title_editing' value='" + $this.text() + "'>");
            $(".task_title_editing").focus();
        },
        "keydown .task_title_editing": function (event) {
            var pressedEnter, pressedEsc, pressedTab, pressedShiftTab;
            pressedEnter = event.which === 13 || event.keyCode === 13;
            pressedEsc = event.keyCode === 27 || event.which === 27;
            pressedTab = event.keyCode === 9 || event.which === 9;
            pressedShiftTab = event.which === 9 && event.shiftKey;
            if (pressedEnter) {
                event.preventDefault();
                $(event.target).blur();
            } else if (pressedEsc) {
                event.preventDefault();
                $(event.target).val( this.title ).blur();
            } else if (pressedShiftTab) {
                event.preventDefault();
                var $this = $(event.target);
                var index = $this.parent(".task").index() -1;
                $this.blur();
                $(".task").eq(index).children(".task_title").trigger("edit_task_title");
            } else if (pressedTab) {
                event.preventDefault();
                var $this = $(event.target);
                var index = $this.parent(".task").index() + 1;
                $this.blur();
                if ($(".task").length <= index)
                    index = 0;
                $(".task").eq(index).children(".task_title").trigger("edit_task_title");
            }
        },
        "blur .task_title_editing": function (event) {
            var $this = $(event.target);
            Tasks.update({_id: this._id}, {$set: {title: $this.val()}});
            $(event.target).replaceWith("<span class='task_title'>" + $this.val() + "</span>");
        },
        "click .mark_done": function (event) {
            event.preventDefault();
            Tasks.update({_id: this._id}, {$set: {completed: true, closedBy: Meteor.userId() }});
        },
        "click .mark_undone": function (event) {
            event.preventDefault();
            Tasks.update({_id: this._id}, {$set: {completed: false, closedBy: null }});
        },
        "click .delete": function (event) {
            event.preventDefault();
            Tasks.remove({_id: this._id});
        }
    };
}(jQuery));