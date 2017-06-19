var Store = require('../assets/store');


module.exports =  {
    recognize: function(context,done){
        var intent, users, teams, intentSet;
        var intent = { score: 0.0 };

        var teams = Store.teamsInIntent(context.message.text);
        var users = Store.usersInIntent(context.message.text);
        
         // if names are mentioned in relation to team/zot/groep
        if(
            users.length >0 
            //&& context.message.text.match(/(team|groep|zot)/i).length>0
        ){
            intent = { score: 0.5, intent: 'PersonInTeam' , entities : users};
            intentSet = true;
        }

        //if teams are mentioned in relation to team/zot/groep
        if(
            intentSet != true
            && teams.length >0 
            //&& context.message.text.match(/(doet|team|zot|focus)/i).length>0
        ){
            intent = { score: 0.5, intent: 'TeamDetails' , entities : teams};
            intentSet=true;
        }

        /*if(
            intentSet != true
            //&& teams.length >0 
            && context.message.text.match(/(welke|teams|alle)/i).length>0
        ){
            intent = { score: 0.5, intent: 'AlleTeams'};
            intentSet=true;
        }*/

        //console.log(intent)
        done(null, intent);
    }
    
}