const data_file = require("../assets/data.json");
const jsondata = data_file;

module.exports = {
    usersInIntent: function (names) {
        //return new Promise(function (resolve) {
            names = names.toLowerCase();
            setFromData = [] ;

            //1. first match full hits (and rmove them)
            var foundUsers = jsondata.people.filter(function (row) {
                if(names.indexOf(row.firstName.toLowerCase()+" "+row.lastName.toLowerCase())>=0 ) {
                    names = names.replace(row.firstName.toLowerCase()+" "+row.lastName.toLowerCase(),"")
                    setFromData.push(row);
                }
            });
            // match users on firstname
            var foundUsers = jsondata.people.filter(function (row) {
                if(names.indexOf(row.firstName.toLowerCase())>=0 || names.indexOf(row.lastName.toLowerCase())>=0) {
                     setFromData.push(row);
                }
            });

            return(setFromData);
        //});
    },
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
                if(jsondata.teams[user.Team]){
                    combinedArray = jsondata.teams[user.Team];
                }else{
                    combinedArray = {"DisplayName": user.Team}
                }
                combinedArray["user"] = user;
                setFromData.push(combinedArray);
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