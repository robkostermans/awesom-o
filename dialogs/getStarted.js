var builder = require('botbuilder');

module.exports = [
    function (session) {
        ///session.userData.name = results.response;
        session.send('Hoi %s! aangenaam kennis te maken.', session.userData.name);
        session.endDialog();
    }
];
