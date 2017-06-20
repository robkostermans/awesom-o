const builder = require('botbuilder');
const Store = require('../assets/store');
const Helpers = require("./dialog-helpers");

module.exports = function (session,args) {
    console.log(args)
    Store
        .isUser(args.entities)
        .then(function(persons){

            if(persons.length === 0){
                session.send("Er zijn geen personen gevonden die voldoen aan die naam. Dat zegt niets, wellicht is die data niet bij bekend.")
                session.endDialog();
            }


            for(i=0; i<persons.length;i++){
                var message =  new builder.Message(session);
                    person = persons[i];
                    console.log(person)
                    message.text(person.firstName+" "+ person.lastName + " zit in:")
                    
                    team = Store.getTeam(person.Team);
                    message.addAttachment(Helpers.teamAsAttachment(team));
                    session.send(message);
            }
               
            session.endDialog();
        });
    
    


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