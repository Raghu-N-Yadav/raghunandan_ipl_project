const matchesFilesPath = "../src/data/matches.csv"
const deliveriesFilePath = '../src/data/deliveries.csv'

//importinng function to export file in json file
const exportToJSON = require('./exportToJson');
//importing function file
const matchesData = require('./extraQueFunc');

//importing csv parser
const csv = require('csvtojson');

//parsing matches file to json
csv()
.fromFile(matchesFilesPath)
.then((jsonObj)=>{

    csv()
    .fromFile(deliveriesFilePath)
    .then((jsonObj2) => {

    //calling function to find match and toss winner
    let matchAndTossWinCount = matchesData.tossAndMatchWinner(jsonObj);

    //calling function to find player who won highest player of match each season 
    let playerOfMatchCount = matchesData.playerOfTheMatch(jsonObj);

    //calling function to calculte strike rate of each batsman in each season
    let strikeRateCount = matchesData.strikeRateOfBatsman(jsonObj,jsonObj2);

    //calling function to calculate economy of bowler in super over
    let superOverEconomyCount = matchesData.economyInSuperOver(jsonObj2);

    //calling function to find highest number of times a palyers is disissed by another player
    let playerDismissedCount = matchesData.playerDismissedByAnotherPlayer(jsonObj2);


    //All CONSOLE.LOG ARE WORKING. CHECKED ONE BYE ONE

    //console.log(matchAndTossWinCount);
    //console.log(playerOfMatchCount);
    //console.log(strikeRateCount);
    //console.log(superOverEconomyCount);
    //console.log(playerDismissedCount);

    //exporting matchAndTossWinCount output
    const path = '../src/public/output/matchAndTossWinCount.json'
    exportToJSON(matchAndTossWinCount, path)

    //exporting playerOfMatchCount output
    const path1 = '../src/public/output/playerOfMatchCount.json'
    exportToJSON(playerOfMatchCount, path1); 

    //exporting strikeRateCount output
    const path2 = '../src/public/output/strikeRateCount.json'
    exportToJSON(strikeRateCount, path2);

    //exorting superOverEconomyCount output
    const path3 = '../src/public/output/superOverEconomyCount.json'
    exportToJSON(superOverEconomyCount, path3);

    //exporting playerDismissedCount output
    const path4 = '../src/public/output/playerDismissedCount.json'
    exportToJSON(playerDismissedCount, path4);

})
})