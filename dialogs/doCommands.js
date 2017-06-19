var builder = require('botbuilder');

module.exports = [
    function (session,args) {
        const utterance = args.matched.input || "";
        console.log(utterance)
        if(utterance.indexOf("forgetme")>=0){
            forgetMe(session);
        }
        session.endDialog();
    }
];

function forgetMe(session){
    session.send("forgetting username");
    delete session.userData.name     
}
