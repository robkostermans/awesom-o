var builder = require('botbuilder');
const helpers = require("./dialog-helpers");

module.exports = [
    function (session, results) {
        card = helpers.createThumbnailCard(session);
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
        session.endDialog();
    }
];
