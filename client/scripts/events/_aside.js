/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

    Template.aside.events = {
        "click .aside_user_list li": function (event) {
            Chat.create(this._id);
        }
    };
}(jQuery));