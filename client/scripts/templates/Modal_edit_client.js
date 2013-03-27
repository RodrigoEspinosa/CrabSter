Template.Modal_edit_client.edit_client_name = function () {
	var c = Clients.findOne({_id: Session.get("current_editing")});
	if( c )
		return c.name;
};