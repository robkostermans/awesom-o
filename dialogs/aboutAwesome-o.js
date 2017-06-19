var builder = require('botbuilder');
const helpers = require("./dialog-helpers");

module.exports = [
    //function (session,args) {
        //builder.Prompts.text(session, 'Hoi, ik ben awesome-o. Wie ben jij?');
    //},
    function (session, results) {
       // session.userData.name = results.response;
        card = helpers.createVideoCard(session);
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
        //session.send('Hoi %s! aangenaam kennis te maken.', session.userData.name);
        session.endDialog();
    }
];
