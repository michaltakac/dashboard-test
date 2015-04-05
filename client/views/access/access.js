Template['Access'].helpers({
	
});

var swapScreen = function (id) {
	$('.visible').removeClass('visible animated fadeInUp');
	$('#'+id).addClass('visible animated fadeInUp');
}

Template['Access'].events({
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
	}
});