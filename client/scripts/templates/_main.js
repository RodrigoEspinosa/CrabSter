Template.main.show_tasks = function () {
	if( Session.get("current_project") )
		return true;
	return false;
};