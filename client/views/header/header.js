Template['header'].helpers({
});

Template['header'].events({
	'click .app-logout': function(event){
        event.preventDefault();
        if (Meteor.userId()) {
            AccountsTemplates.logout();
            Router.go('access');
        }
    }
});
