// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');
var Store = require('./assets/store');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var appId = process.env.MY_APP_ID || "Missing your app ID";
var appSecret = process.env.MY_APP_SECRET || "Missing your app secret";

// Create chat bot
var connector = new builder.ChatConnector
    ({ appId: appId, appPassword: appSecret });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


var AwesomeIntentRecognizer = require('./dialogs/intentRecognizer');
bot.recognizer(AwesomeIntentRecognizer);


bot.dialog('/', function (session,args) {

   
   if (!session.userData.name) {
        session.beginDialog('/default');
    } else {
        session.send('Hi %s!', session.userData.name);
    }
    /*
    builder.Prompts.choice(
            session,
            'Are you looking for a flight or a hotel?',
            "PersonInTeam",
            //[DialogLabels.Flights, DialogLabels.Hotels],
            {
                maxRetries: 3,
                retryPrompt: 'Not a valid option'
            });
            */
});



bot.dialog('/default', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);


bot.dialog('/PersonInTeam',require('./dialogs/PersonDetails'))
    .triggerAction({
        matches: "PersonInTeam"
    });

bot.dialog('/TeamDetails',require('./dialogs/TeamDetails'))
    .triggerAction({
        matches: "TeamDetails"
    });

bot.dialog('/AlleTeams',require('./dialogs/AllTeams'))
    .triggerAction({
        matches: "AlleTeams"
    });

/*
Store
    .getAllNames()
    .then(function (data) {

        var matchPersonInTeam = new RegExp("(?=.*("+data+"))(?=.*(zots))","i");
        bot.dialog('PersonInTeam', require('./dialogs/PersonInTeam'))
            .triggerAction({
                dialogArgs : {"allNames":data},
                matches: [matchPersonInTeam]
            });
        var matchAllTeams = new RegExp("(?=.*(teams|groepen))","i");
        bot.dialog('teams', require('./dialogs/AllTeams'))
            .triggerAction({
                
                matches: [matchAllTeams]
            })
            ;
        
    })
*/



server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));