Template.Modal_edit_project.edit_project_name = function () {
	var c = Clients.findOne({_id: Session.get("current_editing")});
	if (c)
		return c.name;
};