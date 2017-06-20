const builder = require('botbuilder');
const Store = require('../assets/store');
const Helpers = require("./dialog-helpers");

module.exports = [
    function(session,next){
        var message =  new builder.Message(session);
       
        Store
        .searchForTeams()
        .then(function (teams) {
                
                session.dialogData.teams = teams
                
                teamslist ="### De volgende teams zijn er binnen Wortell:\n\n";
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
        var message =  new builder.Message(session);
        session.dialogData.team = results.response;
        session.send('Moment, Ik ga op zoek naar informatie over: %s', results.response); 
        team = Store.matchTeam(session.dialogData.team);
        if(team.length>0){
            //console.log(team[0]);
            message.addAttachment(Helpers.teamAsAttachment(team[0]));
            session.send(message);
            session.endDialog();
        }else{
            message.text("die naam kan ik niet vinden in het rijtje. Probeer opnieuw?").
            session.send(message);
            next({ resumed: builder.ResumeReason.back })
        }
        
        
    }
    

];

