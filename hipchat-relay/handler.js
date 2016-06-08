var config = require('../config');

var HipChatClient = require('hipchat-client');
var hipchat = new HipChatClient(config.hipchat.token);

module.exports.handler = function(event, context, cb) {

  // validate event
  if (!event.params.message) {
    throw 'message is required!';
  }

  // creation message and options
  var msg = {
    room_id : config.hipchat.room_id,
    from : config.hipchat.user,
    message : event.params.message
  };

  if (event.params.message_format) {
    msg.message_format = event.params.message_format;
  }

  if (event.params.notify) {
    msg.notify = event.params.notify;
  }

  if (event.params.color) {
    msg.color = event.params.color;
  }

  // send message
  hipchat.api.rooms.message(msg, function(err, res) {
    if (err) {
      throw err;
    }

    console.log(res);

    return cb(null, {
      message: 'Message Sent.'
    });
  });
};
