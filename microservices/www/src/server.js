var express = require('express');
var bodyParser = require('body-parser');
var alexaVerifier = require('alexa-verifier');

const app = express();
app.use(bodyParser.json({
    verify: function getRawBody(req, res, buf) {
        req.rawBody = buf.toString();
    }
}));

function requestVerifier(req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({ message: 'Verification Failure', error: err });
            } else {
                next();
            }
        }
    );
}

app.post('/hasura-ipl', requestVerifier, function(req, res) {
    // We'll fill this out later!
    res.json({ hello: 'world' });
});

app.listen(3000);