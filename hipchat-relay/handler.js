var config = require('../config');

var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient(config.hipchat.token);

module.exports.handler = function(event, context, cb) {

  // validate event
  if (!event.message) {
    throw 'message is required!';
  }

  // creation message and options
  var msg = {
    room_id : config.hipchat.room_id,
    from : config.hipchat.user,
    message : event.message
  };

  if (event.message_format) {
    msg.message_format = event.message_format;
  }

  if (event.notify) {
    msg.notify = event.notify;
  }

  if (event.color) {
    msg.color = event.color;
  }

  // send message
  return hipchat.api.rooms.message(msg, function(err, res) {
    if (err) {
      throw err;
    }

    console.log(res);

    return cb(null, {
      message: 'Message Sent.'
    });
  });
};
