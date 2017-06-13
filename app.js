// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var appId = process.env.MY_APP_ID || "Missing your app ID";
var appSecret = process.env.MY_APP_SECRET || "Missing your app secret";
console.log(appId)
// Create chat bot
var connector = new builder.ChatConnector
    ({ appId: appId, appPassword: appSecret });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
/*bot.dialog('/', function (session) {
    session.send("Hello World");
});*/

/*
bot.dialog('/', function (session) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        session.send('Hello %s!', session.userData.name);
    }
});*/
bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
bot.dialog("/", new builder.IntentDialog().matchesAny('^team', builder.DialogAction.beginDialog('/team'))
     .onDefault(function(session){
        builder.Prompts.text(session, 'Hi! je hebt niets te vragen en/of ik heb niets te zeggen?');
        session.endDialog();
     })

);

bot.dialog('support', require('./events/support'))
    .triggerAction({
        matches: [/help/i, /support/i, /problem/i]
    });


server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));