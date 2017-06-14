const data_file = require("../assets/data.json");
const jsondata = data_file;

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
    },
    searchTeamForPerson: function (names) {
        return new Promise(function (resolve) {

            var foundUsers = jsondata.people.filter(function (row) {
                if(names.indexOf(row.firstName.toLowerCase())>=0 ) {
                    return row
                } else {
                    return false;
                }
            });

            setFromData = [];
            for(var index in foundUsers){
                var user = foundUsers[index];
                console.log(user.team)
                setFromData.push(jsondata.teams[user.Team]);
            }


           setTimeout(function () { resolve(setFromData); }, 0);
        });
    },
    getAllNames: function(){
            return new Promise(function (resolve) {
                var allnames = "";
                for(var index in jsondata.people){
                    var person = jsondata.people[index];
                    allnames += person.firstName+"|";
                }
                allnames = allnames.slice(0,-1);

                setTimeout(function () { resolve(allnames); }, 0);
        });
    }
};