var express = require('express');
var bodyParser = require('body-parser');
var verify = require('./verify');
var forecaster = require('./forecaster');

const app = express();


app.use(express.static('public'));

app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));


app.get('/', function(req, res) {
    res.json({ message: 'The Hasura IPL is up and running.', since: (new Date()).toString() });
});

app.post('/forecast', verify, forecaster);

app.listen(8080, () => {
    console.log("App is listening to port 8080");
});
