var express = require('express');
var bodyParser = require('body-parser');
var alexa = require("alexa-app");

const app = express();
var alexaApp = new alexa.app("ipl");
app.set("view engine", "ejs");


app.use(express.static('public'));


app.get('/', function(req, res) {
    res.send("Hasura IPL is listening to requests at /ipl");
});

app.get('/ipl', function(req, res) {
    res.send("Hasura IPL skill is live.");
});

alexaApp.express({
    expressApp: app,
    //router: express.Router(),
  
    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: false,
  
    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: true
  });
  
  // now POST calls to /test in express will be handled by the app.request() function
  
  // from here on you can setup any other express routes or middlewares as normal
  
  alexaApp.launch(function(request, response) {
    response.say("You have launched the Hasura IPL skill.");
  });
  
  
  alexaApp.intent("iplDefinitionIntent", {},
    function(request, response) {
      response.say("The Indian Premier League (IPL), officially Vivo Indian Premier League for sponsorship reasons, is a professional Twenty20 cricket league in India contested during April and May of every year by teams representing Indian cities.");
    }
  );


app.listen(8080, () => {
    console.log("Hasura IPL is listening to port 8080");
});
