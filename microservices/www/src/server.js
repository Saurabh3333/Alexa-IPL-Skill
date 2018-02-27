var express = require('express');
var bodyParser = require('body-parser');
var alexa = require("alexa-app");

const app = express();
var alexaApp = new alexa.app("ipl");
app.set("view engine", "ejs");


app.use(express.static('public'));

//---------------------------------------------------------
var fetchAction =  require('node-fetch');

var url = "https://data.modesty54.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 76a9302025005e13d9a6e123cb5245f7daaf3ee3f94399c7"
    }
};

//-----------------------------------------------------------


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
        var body = {
          "type": "count",
          "args": {
              "table": "matches",
              "where": {}
          }
      };

      requestOptions.body = JSON.stringify(body);

      fetchAction(url, requestOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        res.send("Total number of matches played is " + JSON.stringify(result.count));
      })
      .catch(function(error) {
        res.send('Request Failed:' + error);
      });
    }
  );

alexaApp.intent("thanksIntent", {},
  function(request, response) {
    response.say("Thank you for using Alexa IPL skill made by team T88 HPDF.");
  }
);

alexaApp.intent("iplFinalWinner", {},
  function(request, response) {
    var slot = request.slots['season'];
    response.say("The season number is " + slot.value);
  }
);

app.get('/test', function(req, res) {
    
});


app.listen(8080, () => {
    console.log("Hasura IPL is listening to port 8080");
});
