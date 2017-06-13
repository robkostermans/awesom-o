const data = require("../assets/data.json");
module.exports = {
    searchForTeams: function () {
        return new Promise(function (resolve) {
           
           setFromData = {} ;
           
           for (var team in data.teams) {
                if (data.teams.hasOwnProperty(team)) {
                    setFromData[team] = data.teams[team];
                }
            }
           
           setTimeout(function () { resolve(setFromData); }, 0);
        });
    }
};