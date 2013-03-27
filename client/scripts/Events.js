/*globals Backbone, jQuery, Meteor, Template, Accounts, Projects, Task_Comments, Messages, Tasks, Clients, Session */
/*jslint browser: true, devel: true */
(function ($) {
    "use strict";
    
    $(document).on("click", ".login-link-text, #login-name-link", function () {
        if ($("#login-dropdown-list").hasClass("visible")) {
            $("#login-dropdown-list").removeClass("visible");
        } else {
            $("#login-dropdown-list").addClass("visible");
        }
    });

    $(document).on("ready", function () {
        $(document).tooltip({
            selector: "a[title], span[title], img[title], div[title]"
        });
    });
    
    $(document).on("click", ".modal-cancel", function () {
        $(this).parents(".modal").modal("hide");
    });
    
    $(document).on("hide", ".modal", function () {
        switch ($(this).attr("id")) {
        case "Modal_task_details":
            Session.set("current_task", null);
            break;
        }
        // Backbone.history.navigate("/");
    });
}(jQuery));