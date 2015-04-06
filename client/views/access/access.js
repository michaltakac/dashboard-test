Template['Access'].helpers({
	
});

var swapScreen = function (id) {
	$('.visible').removeClass('visible animated fadeInUp');
	$('#'+id).addClass('visible animated fadeInUp');
}

Template['Access'].events({
	// Swapping screens
	'click .register-link': function(event) {
		swapScreen('register');
		return false;
	},
	'click .forgot-link': function(event) {
		swapScreen('forgot');
		return false;
	},
	'click .login-link': function(event) {
		swapScreen('login');
		return false;
	},
	// Social icons button events
	'click .btn-facebook': function() {
		return Meteor.loginWithFacebook({
			requestPermissions: ['email']
		}, function(error) {
			if (error) {
				console.log(error.reason);
			}
		});
	},
	'click .btn-google': function() {
		return Meteor.loginWithGoogle({
			requestPermissions: ['email']
		}, function(error) {
			if (error) {
				console.log(error.reason);
			}
		});
	},
	'click .btn-twitter': function() {
		return Meteor.loginWithTwitter(function(error) {
			if (error) {
				console.log(error.reason);
			}
		});
	}
	
});