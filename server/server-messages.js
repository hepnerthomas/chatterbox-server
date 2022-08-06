const _ = require('underscore');

var ServerMessages = {

  _data: {},

  items: function() {
    return _.chain(Object.values(ServerMessages._data)).sortBy('createdAt');
  },

  add: function(message, callback = ()=>{}) {
    ServerMessages._data[message.message_id] = message;
    callback(ServerMessages.items());
  },

  update: function(messages, callback = ()=>{}) {
    var length = Object.keys(Messages._data).length;

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
    return message;
  }

};

// Export Modules
exports.ServerMessages = ServerMessages;