// Social networks - Login settings
createServiceConfiguration('facebook', 'Insert your appId here.', 'Insert your secret here.')
createServiceConfiguration('google', 'Insert your clientId here.', 'Insert your secret here.')
createServiceConfiguration('twitter', 'Insert your consumerKey here.', 'Insert your secret here.')

createServiceConfiguration = function(service, clientId, secret) {
  ServiceConfiguration.configurations.remove({
    service: service
  });
  var config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };
  switch (service) {
    case 'facebook':
      ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      ServiceConfiguration.configurations.insert(config.twitter);
    default:
      ServiceConfiguration.configurations.insert(config.generic);
  }
};