Router.route('dashboard',
  path: '/dashboard'
  template: 'dashboard'
  layout: 'MainLayout'
  waitOn: ->
    Meteor.subscribe 'userData'
  onBeforeAction: ->
    Session.set 'currentRoute', 'dashboard'
    @next()
)