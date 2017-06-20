var Store = require('../assets/store');


module.exports =  {
    recognize: function(context,done){
        var intent, users, teams, intentSet;
        var intent = { score: 0.0 };

        //var teams = Store.teamsInIntent(context.message.text);
        var users = Store.usersInIntent(context.message.text);
        
         // if names are mentioned in relation to team/zot/groep
        if(
            users.length >0 
            //&& context.message.text.match(/(team|groep|zot)/i).length>0
        ){
            intent = { score: 0.5, intent: 'TeamForPerson' , entities : users};
            intentSet = true;
        }

        //console.log(intent)
        done(null, intent);
    }
    
}