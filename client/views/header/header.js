Template['header'].helpers({
});

Template['header'].events({
	'click .logout': function(e,t) {
		Meteor.logout(function(error) {
			if (error) {
				alert(error.reason);
			}
		});
	}
    
});
