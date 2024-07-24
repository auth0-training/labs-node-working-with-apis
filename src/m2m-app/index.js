const {
  checkUrl,
  APP_URL, // Public URL for this app
  API_URL, // URL for Expenses API
  ISSUER_BASE_URL, // Auth0 Tenant Url
  CLIENT_ID, // Auth0 Web App Client
  CLIENT_SECRET, // Auth0 Web App CLient Secret
  SESSION_SECRET, // Cookie Encryption Key
  PORT,
} = require("./env-config");

const request = require("request");

const getAccessToken  = function(callback){
  if (!ISSUER_BASE_URL){
    callback(new Error("The ISSUER_BASE_URL is required in order to get an access token."))
  }
  console.log(`Fetching access token from https://${ISSUER_BASE_URL}/oauth/token`)


const config = 
  {
    method: 'POST',
    url: 'https://' + env('AUTH0_DOMAIN') + '/oauth/token',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: {
      audience: API_URL,
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    },
    json: true
  };

  request(options, function(err, res, body) {
    if (err || res.statusCode < 200 || res.statusCode >= 300) {
      return callback(res && res.body || err);
    }

    callback(null, body.access_token);
  });
}

console.log(`Starting the Gift Deliveries worker at ${APP_URL}`);

// Get the access token.
getAccessToken(function(err, accessToken) {
  if (err) {
    console.log('Error getting a token:', err.message || err);
    return;
  }

  console.log('Getting directions to the Auth0 Office from the World Mappers API');

  // Call the Worldmappers API with the access token.
  var options = {
    url: APP_URL,
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }
  request.get(options, function(err, res, body) {
    if (err || res.statusCode < 200 || res.statusCode >= 300) {
      console.log(res && res.body || err);
    } else {
      console.log('Directions:', body);
    }
  });
})

