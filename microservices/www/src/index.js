'use strict';

const app = require('jovo-framework').Jovo;
const webhook = require('jovo-framework').Webhook;
var fetchAction =  require('node-fetch');
var express = require('express');

const appExpress = express();

let intentMap = {
    'AMAZON.YesIntent': 'YesIntent',
    'AMAZON.NoIntent': 'NoIntent',
};
app.setIntentMap(intentMap);

// Listen for post requests
webhook.listen(8080, function() {
    console.log('Local development server listening on port 8080.');
});

webhook.post('/ipl', function(req, res) {
   
    app.handleRequest(req, res, handlers);
    app.execute();
    
});

appExpress.get('/', function(req, res) {
    res.send("Hasura IPL is listening to requests at /ipl");
});

appExpress.get('/ipl', function(req, res) {
    res.send("Hasura IPL skill is live.");
});

var url = "https://data.modesty54.hasura-app.io/v1/query";

var requestOptions = {
    method: "POST",
    url: "https://data.modesty54.hasura-app.io/v1/query/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 76a9302025005e13d9a6e123cb5245f7daaf3ee3f94399c7"
    }
};
var seasons={"2008":2008,"1":2008,"2009":2009,"2":2009,"2010":2010,"3":2010,"2011":2011,"4":2011,"2012":2012,"5":2012,"2013":2013,"6":2013,"2014":2014,"7":2014,"2015":2015,
"8":2015,"2016":2016,"9":2016,"2017":2017,"10":2017}

const handlers = {
    'LAUNCH': function() {
        app.toIntent('helloIntent');
    },
    'helloIntent': function(){
      app.tell("Hello! Welcome to the Alexa IPL skill. You can ask me anything related to Indian Premier League.");
    },
    'thanksIntent': function(){
        app.tell("Thanks for using Alexa IPL skill. Bye!");
    },
    'iplTotalMatches': function(){
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
            app.tell("Total number of matches played is " + JSON.stringify(result.count) + ".");
        })
        .catch(function(error) {
            app.tell('Sorry! We are unable to process your request. Thank You!');
        });
    },
    'iplFinalWinner': function(season){
        var seasonNumber = season;
        if(seasons[season]){
        var season = JSON.stringify(seasons[season]);
        
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
            app.tell("The winner of IPL season " + seasonNumber + " is" + JSON.stringify(result[result.length-1].winner));
        })
        .catch(function(error) {
            app.tell('Sorry! We are unable to process your request. Thank You!');
        });
        }
        else{
            app.tell('Sorry! We do not have any data of IPL season ' + seasonNumber + '. Thank You!');
        }
    },
};

appExpress.listen(8081, function () {
    console.log("Static Pages are listening to port 8081");
    });