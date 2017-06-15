const data_file = require("../assets/data.json");
const jsondata = data_file;

module.exports = {
    usersInIntent: function (utterance) {
        //return new Promise(function (resolve) {
            utterance = utterance.toLowerCase();
            setFromData = [] ;
            
            //1. first match full hits (and rmove them)
            var foundUsers = jsondata.people.filter(function (row) {
                if(utterance.indexOf(row.firstName.toLowerCase()+" "+row.lastName.toLowerCase())>=0 ) {
                    utterance = utterance.replace(row.firstName.toLowerCase()+" "+row.lastName.toLowerCase(),"")
                    setFromData.push(row);
                }
            });
            // match users on firstname
            var foundUsers = jsondata.people.filter(function (row) {
                if(utterance.indexOf(row.firstName.toLowerCase())>=0 || utterance.indexOf(row.lastName.toLowerCase())>=0) {
                     setFromData.push(row);
                }
            });

            return(setFromData);
        //});
    },
    teamsInIntent: function (utterance) {
        //return new Promise(function (resolve) {
            utterance = utterance.toLowerCase();
            setFromData = [] ;

            //1. match full hits (and rmove them)
            //console.log(jsondata.teams["greenloveharmony"])
            for(var index in jsondata.teams){
                team = jsondata.teams[index];
                if(utterance.indexOf(team.DisplayName.toLowerCase())>=0 ) {
                    //setFromData.push(team);
                }
            };
            
            return(setFromData);
        //});
    },
    getTeamsForUsers: function(users){
        return new Promise(function (resolve) {
            setFromData = [] ;
            for(var index in users){
                user = users[index];
                team = jsondata.teams[user.Team];
                team_data = (!team)? jsondata.teams["Default"] : team ;
                team_data.retrievedForUser = user;
                setFromData.push(team_data);
            }

            resolve(setFromData);
        });
    },
    searchForTeams: function () {
        return new Promise(function (resolve) {
           
           setFromData = {} ;
           
            for(var index in jsondata.teams){
                team = jsondata.teams[index];
                setFromData[index] = team;
                //console.log( setFromData[index])
            }
           
           resolve(setFromData);
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