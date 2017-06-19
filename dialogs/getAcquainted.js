var builder = require('botbuilder');

module.exports = [
    function (session,args) {
        builder.Prompts.text(session, 'Hoi, ik ben awesome-o. Wie ben jij?');
    },
    function (session, results) {
        var name = results.response;
        name.replace("ik ben","");
        name.replace("mijn naam is","");
        name.replace("mijn voornaam is","");
        session.userData.name = name;
        session.send('Hoi %s! aangenaam kennis te maken.', session.userData.name);
        session.endDialog();
    }
];
