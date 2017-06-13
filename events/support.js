var builder = require('botbuilder');
var Store = require('./store');

module.exports = function (session) {
    Store
        .searchForTeams()
        .then(function (data) {
            // Results
            /*
            session.send('I found in total %d hotels for your dates:', hotels.length);

            var message = new builder.Message()
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(hotels.map(hotelAsAttachment));
            */
            card = createHeroCard(session,data)
           
            message =  new builder.Message(session).addAttachment(card);
            session.send(message);

            // End
            session.endDialog();
        });
};

function createHeroCard(session,data) {
    return new builder.HeroCard(session)
        .title('BotFramework Hero Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images([
            builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
        ])
        .buttons([
            builder.CardAction.imBack(session,"actie van kaart")
                //.openUrl(session, 'https://docs.microsoft.com/bot-framework', 'Get Started')
        ]);
}