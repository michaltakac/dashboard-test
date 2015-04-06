var Future = Npm.require('fibers/future');

Meteor.methods({
  validateEmailAddress: function(address) {
    check(address, String);
    var validateEmail = new Future();
    HTTP.call("GET", "https://api.kickbox.io/v1/verify", {
      params: {
        email: address,
        apikey: 2894f0efad058f7cc6cefbd6ae0012de54450235d61db7e7af6e05ac2e9af316
      }
    }, function(error, response) {
      if (error) {
        return validateEmail(error);
      } else {
        if (response.data.result === "invalid" || response.data.result === "unknown") {
          validateEmail["return"]({
            error: "Sorry, your email was returned as invalid. Please try another address."
          });
        } else {
          return validateEmail(true);
        }
      }
    });
    validateEmail.wait();
  }
});