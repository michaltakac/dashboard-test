Accounts.onCreateUser( function(options, user) {
	var userData = {
		email: determineEmail(user),
		name: options.profile ? options.profile.name : ""
	};
	if (userData.email !== null) {
		Meteor.call('sendWelcomeEmail', userData, function(error) {
			if (error) {
				console.log(error);
			}
		});
	}
	if (options.profile) {
		user.profile = options.profile;
	}
	return user;
});