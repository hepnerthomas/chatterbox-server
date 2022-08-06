var examplePost = {
  POST: {
    description: "Post a message to Chatterbox server",
    parameters: {
      username: {
        type: "string",
        description: "Name of the user posting the message."
      },
      text: {
        type: "string",
        description: "User's message."
      },
      roomname: {
        type: "string",
        description: "Name of the room user is posting the message into."
      }
    },
    example: {
      username: "thomashepner",
      text: "I love posting in chatterbox.",
      roomname: "thomas special room",
    }
  }
}

module.exports = {examplePost};