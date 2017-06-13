const jsondata = require("../assets/data.json");
module.exports = {
    searchForTeams: function () {
        return new Promise(function (resolve) {
           
           setFromData = {} ;
           
           for (var team in jsondata.teams) {
                if (jsondata.teams.hasOwnProperty(team)) {
                    setFromData[team] = jsondata.teams[team];
                }
            }
           
           setTimeout(function () { resolve(setFromData); }, 0);
        });
    }
};