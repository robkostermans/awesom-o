// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');
var Store = require('./assets/store');
var intentRecognizer = require('./dialogs/intentRecognizer');

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

bot.recognizer({
  recognize: function (context, done) {
  var intent = { score: 0.0 };
        var users = Store.usersInIntent(context.message.text);
        
        if(result.length >0 && context.message.text.match(/(team|group|zot)/i).length>0){
            intent = { score: 1.0, intent: 'PersonInTeam' , entities : result};
        }

        done(null, intent);
    }
});


bot.dialog('/', function (session,args) {
   var intent = intentRecognizer(session);
   if (!intent) {
        session.beginDialog('/default');
    } else {
        session.send('Hi %s!', session.userData.name);
    }
    /*if (!session.userData.name) {
        session.beginDialog('/default');
    } else {
        session.send('Hi %s!', session.userData.name);
    }*/
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




server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));