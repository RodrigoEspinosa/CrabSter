Template.Modal_edit_project.edit_project_createdAt = function () {
	var p = Projects.findOne({_id: Session.get("current_editing")});
	if (p)
		return Utils.dateFormat(p.createdAt);
};
Template.Modal_edit_project.edit_project_createdAtAgo = function () {
	var p = Projects.findOne({_id: Session.get("current_editing")});
	if (p)
		return moment(p.createdAt).fromNow();
};
Template.Modal_edit_project.edit_project_createdBy = function () {
	var p = Projects.findOne({_id: Session.get("current_editing")}), user;
	if (p) {
		user = Meteor.users.findOne({_id: p.createdBy});
		if (user)
			return user.profile.name + " " + user.profile.lastname;
	}
};
Template.Modal_edit_project.edit_project_name = function () {
	var p = Projects.findOne({_id: Session.get("current_editing")});
	if (p)
		return p.name;
};
Template.Modal_edit_project.edit_project_deadline = function () {
	var p = Projects.findOne({_id: Session.get("current_editing")});
	if (p)
		return moment(p.deadline).format("DD/MM/YYYY");
};