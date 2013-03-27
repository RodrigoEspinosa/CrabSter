/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";

	Template.header.events = {
        "click .user_actions": function (event) {
            var $dropmenu, $self;
            event.preventDefault();
            $dropmenu = $(".dropmenu");
            $self = $(".user_actions");
            $self = $self.hasClass("active") ? $self.removeClass("active") : $self.addClass("active");
            $dropmenu = $dropmenu.hasClass("active") ? $dropmenu.removeClass("active") : $dropmenu.addClass("active");
        }
    };
}(jQuery));