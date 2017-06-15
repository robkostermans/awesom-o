var builder = require('botbuilder');

module.exports = function (session,args) {
    session.send("-----START: personDetails");
    console.log(args.intent.entities);
    session.endDialog();
};