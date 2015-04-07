Template.registerHelper('debug', function (optionalValue) {
  if (typeof console !== "undefined" || typeof console.log !== "undefined") {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }

    return '';
  }

  // For IE8
  alert(this);

  if (optionalValue) {
    alert(optionalValue);
  }

  return '';
});

Template.registerHelper('constant', function (what) {
  return Meteor.App[what.toUpperCase()];
});

Template.registerHelper('userIdentity', function(userId) {
  var getService, getUser, services;
  getUser = Meteor.users.findOne({
    _id: userId
  });
  if (getUser.emails) {
    return getUser.emails[0].address;
  } else if (getUser.services) {
    services = getUser.services;
    getService = (function() {
      switch (false) {
        case !services.facebook:
          return services.facebook.email;
        case !services.github:
          return services.github.email;
        case !services.google:
          return services.google.email;
        case !services.twitter:
          return services.twitter.screenName;
        default:
          return false;
      }
    })();
    return getService;
  } else {
    return getUser.profile.name;
  }
});
