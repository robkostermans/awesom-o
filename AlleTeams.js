
module.exports =  {
    recognize: function(context,done){
        var intent = { score: 0.0, intent: 'AlleTeams' };

        if(context.message.text.match(/(welke|teams|alle)/i)){             
            intent = { score: 0.6, intent: 'AlleTeams'};
            
        }
        done(null, intent);
    }
    
}