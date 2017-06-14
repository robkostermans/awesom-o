var builder = require('botbuilder');
var Store = require('../assets/store');

module.exports = function (session,args) {
    var matchedName = [];
    var regMatch = new RegExp("("+args.allNames+")+","ig");
    var arrayOfMatches = args.intent.matched.input.match(regMatch)
    for(var index in arrayOfMatches){
        matchedName.push(arrayOfMatches[index].toLowerCase())
    }

    if(matchedName.length > 0){
        //console.log(matchedName+"::"+matchedName.length)
        Store
            .searchTeamForPerson(matchedName)
            .then(function (data) {
                /*console.log(data)
                var message = new builder.Message()
                    .text("dit heb ik gevonden")
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(data.map(teamAsAttachment));
                */
                for(i =0; i<data.length;i++){
                    var message =  new builder.Message(session);
                        team = data[i];
                        message.text(team["user"].firstName + " zit in:")
                        message.addAttachment(teamAsAttachment(team));
                        session.send(message);
                }
               
            

                session.endDialog();
            });
    }else{
        console.log("no matched name ask for user");
        session.endDialog();
    }
};

function teamAsAttachment(team) {
    console.log(team)
    return new builder.HeroCard()
        .title(team.DisplayName)
        .subtitle(team.Focus)
        .images([new builder.CardImage().url(team.Emblem)])
        /*.buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.bing.com/search?q=hotels+in+')
        ]);*/
}