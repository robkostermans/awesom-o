var builder = require('botbuilder');
var Store = require('../assets/store');

module.exports = [
    function(session,next){
        var message =  new builder.Message(session);
       
        Store
        .searchForTeams()
        .then(function (teams) {
                
                session.dialogData.teams = teams
                
                teamslist ="## De volgende teams zijn er binnen Wortell:\n\n";
                for(var index in teams){
                    team = teams[index];
                    teamslist +="- "+team.DisplayName+"\n ";
                }
                //teamslist = teamslist.slice(0,-2);
                message.text(teamslist);
                session.send(message);
                builder.Prompts.text(session, 'Over welk team wil je meer weten?');

        })
    },
    function (session, results, next){
        session.dialogData.team = results.response;
        session.send('Moment, Ik ga op zoek naar informatie over: %s', results.response); 
        next();
    },
    function (session, results, next){
        // check
       // console.log(session.dialogData.teams)
        session.send('Gevonden'); 
        session.endDialog();
    }

];

