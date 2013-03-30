Template.Modal_require_confirmation.title = function () {
	return Session.get("current_confirmation_title");
};

Template.Modal_require_confirmation.content = function () {
	return Session.get("current_confirmation_content");
};