var config = require('../config');
var request = require('request');

module.exports.handler = function(event, context, cb) {
  var payload = {
    "text": event.message
  };

  if (config.slack.user) {
    payload.username = config.slack.user;
  }

  return request.post({
    url: config.slack.webhook,
    body: JSON.stringify(payload),
  }, function(error, response, body) {
    if (error) {
      return cb(null, {
        error: 'An error occured sending the message: ' + error
      });
    }
    return cb(null, {
      message: 'Sent message'
    });
  });
};
