const Alexa = require('alexa-sdk');
 
exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = 'amzn1.ask.skill.77a961da-da8f-4d6a-9f4b-71f99eacb92d'; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
    alexa.execute();
};

const handlers = {
    'HelloWorldIntent' : function() {
        //emit response directly
        this.emit(':tell', 'Hello World!');
    }
};