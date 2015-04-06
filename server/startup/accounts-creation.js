var determineEmail = function(user) {
	var emailAddress, services;
	if (user.emails) {
		return emailAddress = user.emails[0].address;
	} else if (user.services) {
		services = user.services;
		return emailAddress = (function() {
			switch (false) {
				case !services.facebook:
					return services.facebook.email;
				case !services.github:
					return services.github.email;
				case !services.google:
					return services.google.email;
				case !services.twitter:
					return null;
				default:
					return null;
			}
		})();
	} else {
		return null;
	}
};

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