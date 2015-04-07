Router.route('/access', {
	name: 'access',
	action: function () {
		this.layout('AccessLayout');
		this.render('Access');
		SEO.set({ title: 'Access - ' + Meteor.App.NAME });
	}
});


// test route
Router.route('/dashboard/user/8g47', {
	name: 'user-profile',
	action: function () {
		this.layout('MainLayout');
		this.render('UserProfile');
		SEO.set({ title: 'Profile - ' + Meteor.App.NAME });
	}
});

Router.route('/dashboard/droplogs', {
	name: 'droplogs-list',
	action: function () {
		this.layout('MainLayout');
		this.render('droplogsList');
		SEO.set({ title: 'Droplog - ' + Meteor.App.NAME });
	}
});

Router.route('/dashboard/droplogs/:_id', {
	name: 'droplog',
	// subscribe to todos before the page is rendered but don't wait on the
		// subscription, we'll just render the items as they arrive
		/*
		onBeforeAction: function () {
			this.todosHandle = Meteor.subscribe('todos', this.params._id);

			if (this.ready()) {
				// Handle for launch screen defined in app-body.js
				dataReadyHold.release();
			}
		},
		data: function () {
			return Lists.findOne(this.params._id);
		},
		*/
	action: function () {
		this.layout('MainLayout');
		this.render('droplog');
		SEO.set({ title: 'Droplog - ' + Meteor.App.NAME });
	}
});

Router.route('/dashboard/calendar', {
	name: 'calendar',
	action: function () {
		this.layout('MainLayout');
		this.render('calendar');
		SEO.set({ title: 'Calendar - ' + Meteor.App.NAME });
	}
});
