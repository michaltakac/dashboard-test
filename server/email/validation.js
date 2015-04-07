var Future = Npm.require('fibers/future');

Meteor.methods({
  validateEmailAddress: function(address) {
    check(address, String);
    var validateEmail = new Future();
    HTTP.call("GET", "https://api.kickbox.io/v1/verify", {
      params: {
        email: address,
        apikey: "2894f0efad058f7cc6cefbd6ae0012de54450235d61db7e7af6e05ac2e9af316"
      }
    }, function(error, response) {
      if (error) {
        return validateEmail["return"](error);
      } else {
        if (response.data.result === "invalid" || response.data.result === "unknown") {
          validateEmail["return"]({
            error: "Sorry, your email was returned as invalid. Please try another address."
          });
        } else {
          return validateEmail["return"](true);
        }
      }
    });
    return validateEmail.wait();
  },
  sendWelcomeEmail: function(userData) {
    var emailTemplate;
    check(userData, {
      email: String,
      name: String
    });
    SSR.compileTemplate('welcomeEmail', Assets.getText('email/welcome-email.html'));
    emailTemplate = SSR.render('welcomeEmail', {
      email: userData.email,
      name: userData.name !== "" ? userData.name : null,
      url: "http://localhost:3000"
    });
    return Email.send({
      to: userData.email,
      from: "The Meteor Chef - Demo <demo@themeteorchef.com>",
      subject: "Welcome aboard, team matey!",
      html: emailTemplate
    });
  }
});