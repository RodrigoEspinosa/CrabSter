Template.aside.location = function () {
	return "Montevideo";
};

Template.aside.date = function () {
	var d = new Date();
	return d.getDate()+"."+(d.getMonth()+1)+"."+(d.getFullYear()).toString().substr(2);
};

Template.aside.clients = function () {
	var clients = Clients.find({}).fetch();
	// Get project clients
	for( client in clients ){
		var c = clients[client];
		clients[client].projects = Projects.find({client: c._id}).fetch();
	}
	return clients;
};

Template.aside.user_list = function () {
	var users = Meteor.users.find({
		_id: {
			$not: Meteor.userId()
		}
	}, {
		transform: function (user) {
			user.profile.name = "ASDDSA";
			user.profile.lastname = "aaaaaaaa2;";
			return user;
		}
	});
	return users;
};