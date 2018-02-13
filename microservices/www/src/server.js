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
    checkCert: false,
    debug: true
  });
  
  alexaApp.launch(function(request, response) {
    response.say("You have launched the Hasura IPL skill..");
  });
  
  
  alexaApp.intent("iplDefinitionIntent", {},
    function(request, response) {
      response.say("The Indian Premier League (IPL), officially Vivo Indian Premier League for sponsorship reasons, is a professional Twenty20 cricket league in India contested during April and May of every year by teams representing Indian cities.");
    }
  );

  alexaApp.intent("iplTotalMatches", {},
  function(request, response) {
    response.say("Total number of matches played is 336.");
    }
  );


app.listen(8080, () => {
    console.log("Hasura IPL is listening to port 8080");
});
