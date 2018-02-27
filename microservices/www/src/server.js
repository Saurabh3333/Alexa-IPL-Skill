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
var seasons={"2008":2008,"1":2008,"2009":2009,"2":2009,"2010":2010,"3":2010,"2011":2011,"4":2011,"2012":2012,"5":2012,"2013":2013,"6":2013,"2014":2014,"7":2014,"2015":2015,
"8":2015,"2016":2016,"9":2016,"2017":2017,"10":2017}

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
        response.say("Total number of matches played is " + JSON.stringify(result.count));
      })
      .catch(function(error) {
        response.say('Request Failed:' + error);
      });
    }
  );

alexaApp.intent("thanksIntent", {},
  function(request, response) {
    response.say("Thank you for using Alexa IPL skill. Bye!");
  }
);

alexaApp.intent("iplFinalWinner", {},
  function(request, response) {
    var slot = request.slots['season'];
    if(seasons[slot.value]){
      var season = JSON.stringify(seasons[slot.value]);
    
      var body = {
        "type": "select",
        "args": {
            "table": "matches",
            "columns": [
                "*"
            ],
            "where": {
                "season": {
                    "$eq": season
                }
            }
        }
    };

      requestOptions.body = JSON.stringify(body);

      fetchAction(url, requestOptions)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        response.say(JSON.stringify(result[result.length-1].winner));
      })
      .catch(function(error) {
        response.say('Sorry! We are unable to process your request.');
      });
    }
    else{
      response.say('Sorry! We are unable to process your request.');
    }
  }
);

app.get('/test', function(req, res) {
  
});


app.listen(8080, () => {
    console.log("Hasura IPL is listening to port 8080");
});
