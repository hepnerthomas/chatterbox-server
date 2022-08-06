/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
const {ServerMessages} = require('./server-messages.js');
const {examplePost} = require('./example-post.js');

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // // Need to response to all of these request types
  // if (request.endpoint === '/users') {
  //   // do users stuff
  //   // GET, POST, PATCH, etc.
  //   if (request.method === 'GET') {
  //     // fetch all users
  //     response.writeHead(418, { 'Content-Type': 'application/json' }); // is this the status code we want to use
  //     response.end(); // end the response
  //   } else if (request.method === 'POST') {
  //     // create a new user
  //   }

  // } else if (request.endpoint === 'blogs') {
  //   // do blog stuff
  // }
  // // GET
  //   // users, blogs, tweets, etc.
  // // POST
  // // PUT

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode;

  // data to get or post
  var data;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain ';  // application/json
  // headers['Content-Type'] = 'application/json';  //
  headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';

  if (request.url === '/classes/messages' && request.method === 'GET') {
    statusCode = 200;
    data = ServerMessages.items();

  } else if (request.url === '/classes/messages' && request.method === 'OPTIONS') {
    statusCode = 200;
    data = examplePost;

  } else if (request.url === '/classes/messages' && request.method === 'POST' && request.headers['content-type'] === 'application/json') {
    // Set the status code to success: resource created
    statusCode = 201;

    // Get message from the POST request
    let message = '';
    request.on('data', chunk => {
      message += chunk;
    });

    // get the data in JSON format
    request.on('end', () => {
      // console.log(JSON.parse(data).todo); // 'Buy the milk'

      // try to convert to JSON
      try {

        message = JSON.parse(message);

        // Check that message conforms
        message = ServerMessages._conform(message);
        // Add the message to ServerMessages data
        ServerMessages.add(message);

      // catch error and set status code to 400
      } catch (error) {
        statusCode = 400;
        data = "Improperly formatted request.";
        console.log(statusCode);
      }

    });
  }
  else {
    // else if PATCH
    // else if DELETE
    // else if other HTTP methods
    // else
    // tell user they are calling our server in a way we do not support
    // 404 Not Found
    statusCode = 404;
    data = "Your request is not supported.";
  }
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify(data));

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

// Export Modules
exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
