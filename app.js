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

var normalizedPath = require("path").join(__dirname, "intents");
var AllIntentsRecognizers = [];
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  AllIntentsRecognizers.push(require("./intents/" + file));
});


const intents = new builder.IntentDialog({
    recognizers: AllIntentsRecognizers,
    intentThreshold: 0.2,
    recognizeOrder: builder.RecognizeOrder.parallel
});

intents.matches('AlleTeams', '/AlleTeams');
intents.matches('TeamForPerson', '/TeamForPerson');
intents.matches('TeamDetails', '/TeamDetails');
intents.matches('AboutAwesomeO', '/aboutAwesome-o');
intents.matches(/\!\:/i, '/doCommands');
intents.onDefault('/default');
//Um, actually, A.W.E.S.O.M.-O is not programmed for that function.

bot.dialog('/', intents);

bot.dialog('/default', [
    
    function (session,args) {
       if (session.userData.name) {
            session.beginDialog('/getStarted');
        } else {
            session.beginDialog('/getAcquainted');
        }
    }
    
  
]);

bot.dialog("/getStarted",require('./dialogs/getStarted'))

bot.dialog("/getAcquainted",require('./dialogs/getAcquainted'))

bot.dialog("/aboutAwesome-o",require('./dialogs/aboutAwesome-o'))

bot.dialog('/TeamForPerson',require('./dialogs/TeamForPerson'))

bot.dialog('/TeamDetails',require('./dialogs/TeamDetails'))

bot.dialog('/AlleTeams',require('./dialogs/AllTeams'))

bot.dialog('/doCommands',require('./dialogs/doCommands'))





server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));