Accounts.emailTemplates.siteName = "Runelytics";
Accounts.emailTemplates.from = "Runelytics <support@runelytics.com>";
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.displayName;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var signature = "nonreply";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
    //    signature = president.profile.displayName + ", Runelytics CEO.";
    return "Dear " + user.profile.displayName + ",\n\n" +
        "Click the following link to set your new password:\n" +
        url + "\n\n" +
        "You can login with new passowrd.\n\n\n" +
        "Cheers,\n" +
        signature;
};
