const _ = require('underscore');

var ServerMessages = {

  _data: {},

  items: function() {
    return _.chain(Object.values(ServerMessages._data)).sortBy('createdAt');
  },

  add: function(message, callback = ()=>{}) {
    // set message.id to length of _data array
    var id = Object.keys(ServerMessages._data).length;
    message.message_id = id;

    ServerMessages._data[message.message_id] = message;
    callback(ServerMessages.items());
  },

  update: function(messages, callback = ()=>{}) {
    var length = Object.keys(ServerMessages._data).length;

    for (let message of messages) {
      ServerMessages._data[message.message_id] = ServerMessages._conform(message);
    }

    // only invoke the callback if something changed
    if (Object.keys(ServerMessages._data).length !== length) {
      callback(ServerMessages.items());
    }
  },

  _conform: function(message) {
    // ensure each message object conforms to expected shape
    message.text = message.text || '';
    message.username = message.username || '';
    message.roomname = message.roomname || '';

    // delete keys not specified by the server
    var keys = Object.keys(message);
    keys.forEach((key) => {
      if (!['text', 'username', 'roomname'].includes(key)) {
        delete message[key];
      }
    });
    return message;
  }

};

// Export Modules
exports.ServerMessages = ServerMessages;