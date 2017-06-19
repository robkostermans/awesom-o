
module.exports =  {
    recognize: function(context,done){
        var intent = { score: 0.0};
        const utterance = context.message.text.toLowerCase() || "";
        if(utterance.match(/(over|aweomeo)/i)){             
            intent = { score: 0.6, intent: 'AboutAwesomeO'};
            
        }
        done(null, intent);
    }
    
}