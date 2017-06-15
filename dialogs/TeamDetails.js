var builder = require('botbuilder');
var Store = require('../assets/store');

module.exports = function (session,args) {
    teams = args.intent.entities;
    for(i=0; i<teams.length;i++){
            var message =  new builder.Message(session);
                team = teams[i];
                //message.text(team["retrievedForUser"].firstName+" "+ team["retrievedForUser"].lastName + " zit in:")
                message.addAttachment(teamAsAttachment(team));
                session.send(message);
        }
    session.endDialog();
};


function teamAsAttachment(team) {
    return new builder.HeroCard()
        .title(team.DisplayName)
        .subtitle(team.Focus)
        .text()
        .tap()
        .images([new builder.CardImage().url(team.Emblem)])
        .buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.wortell.nl/teams/web')
        ]);
}