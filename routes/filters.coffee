###
  Route Filters
  Filters for managing user access to application routes.
###

# Define Filters

###
  Filter: Check if a User is Logged In
  If a user is not logged in and attempts to go to an authenticated route,
  re-route them to the login screen.
###
checkUserLoggedIn = ->
  if not Meteor.loggingIn() and not Meteor.user()
    Router.go '/access'
  else
    @next()

###
  Filter: Check if a User Exists
  If a user is logged in and attempts to go to a public route, re-route
  them to the main "logged in" screen.
###
userAuthenticated = ->
  if not Meteor.loggingIn() and Meteor.user()
    Router.go '/dashboard'
  else
    @next()

# Run Filters
Router.onBeforeAction checkUserLoggedIn, except: [
  'index',
  'access',
  'recover-password',
  'reset-password',
  'dashboard'
]

Router.onBeforeAction userAuthenticated, only: [
  'access',
  'recover-password',
  'reset-password'
]