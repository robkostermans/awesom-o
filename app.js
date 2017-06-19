// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');
//var Store = require('./assets/store');

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


//var AwesomeIntentRecognizer = require('./intents/intentRecognizer');
//bot.recognizer(AwesomeIntentRecognizer);

//bot.recognizer(require('./intentRecognizers/intentAllteams'));
var allteams = require('./intents/AlleTeams');
var teamForPerson = require('./intents/teamForPerson');
//var AwesomeIntentRecognizer = require('./intents/intentRecognizer');
const intents = new builder.IntentDialog({
    recognizers: [
        //new builder.LuisRecognizer(process.env.LUIS_ENDPOINT)
        teamForPerson,
        allteams,
    ],
    intentThreshold: 0.2,
    recognizeOrder: builder.RecognizeOrder.parallel
});
//intents.matches('', '/Default');
intents.matches('AlleTeams', '/AlleTeams');
intents.matches('TeamForPerson', '/TeamForPerson');
intents.matches('TeamDetails', '/TeamDetails');


bot.dialog('/', intents);

/*
bot.dialog('/', function (session,args) {

   
   if (!session.userData.name) {
        session.beginDialog('/default');
    } else {
        session.send('Hi %s!', session.userData.name);
    }
});*/



bot.dialog('/default', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);


bot.dialog('/TeamForPerson',require('./dialogs/TeamForPerson'))
    //.triggerAction({
    //    matches: "PersonInTeam"
    //});

bot.dialog('/TeamDetails',require('./dialogs/TeamDetails'))
    //.triggerAction({
    //    matches: "TeamDetails"
    //});

bot.dialog('/AlleTeams',require('./dialogs/AllTeams'))
    //.triggerAction({
    //    matches: "AlleTeams"
    //});

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