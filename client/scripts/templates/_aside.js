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
			// user.profile.image = Meteor.call("gravatar_url", user.emails[0].address, 200);
			// console.log(user.profile.image);
			// console.log(Meteor.call("gravatar_url", user.emails[0].address, 200));
			// return user;
			// Meteor.call("gravatar_url", user.emails[0].address, 200, function (error, result) {
				// console.log( result );
			// });
			return user;
		}
	});
	return users;
};