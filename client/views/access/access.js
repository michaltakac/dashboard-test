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
	// Using sessions for form submitting
	'click .btn-create-account': function() {
		Session.set('createAccount', 'create');
	},
	'click .btn-sign-in': function() {
		Session.set('loginAccount', 'signin');
	},
	'submit form': function(e) {
		e.preventDefault();
	},
	// Social icons button events
	'click .btn-facebook': function() {
		Meteor.loginWithFacebook({
			requestPermissions: ['email']
		}, function(error) {
			if (error) {
				console.log(error.reason);
			}
		});
	},
	'click .btn-google': function() {
		Meteor.loginWithGoogle({
			requestPermissions: ['email']
		}, function(error) {
			if (error) {
				console.log(error.reason);
			}
		});
	},
	'click .btn-twitter': function() {
		Meteor.loginWithTwitter(function(error) {
			if (error) {
				console.log(error.reason);
			}
		});
	},
	// Form handlers
	createAccountHandler: function() {
		var createAccount = Session.get('createAccount');
		var user = {
			email: $('[name="emailCreate"]').val(),
			password: $('[name="passCreate"]').val()
		};
		if (createAccount === "create") {
			Meteor.call('validateEmailAddress', user.email, function(error, response) {});
		} 
	},
	loginAccountHandler: function() {
		var loginAccount = Session.get('loginAccount');
		var user = {
			email: $('[name="emailLogin"]').val(),
			password: $('[name="passLogin"]').val()
		};
		Meteor.loginWithPassword(user.email, user.password, function(error) {
			if (error) {
				alert(error.reason);
			} else {
				$('.modal-backdrop').hide();
			}
		});
	}
	
});