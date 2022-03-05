const matchesFilesPath = "../data/matches.csv"
const deliveriesFilePath = '../data/deliveries.csv'
const fs =  require('fs');
//importing finction file
const matchesData = require('./ipl')
//importing csv parser
const csv = require('csvtojson')


//parsing matches file to json
csv()
.fromFile(matchesFilesPath)
.then((jsonObj)=>{

    //creating json file for deliveries
    csv()
    .fromFile(deliveriesFilePath)
    .then((jsonObj2) => {
    
    //calling function to count number of matches per year
    let matchCount = matchesData.matchesPerYear(jsonObj);

    //calling functiom to count matches per year played by per team
    let winningCount = matchesData.matchesPerYearPerTeam(jsonObj);

    //calling functiom to count extra runs concided by per team
    let extraRunCount = matchesData.extraRunsPerTeam(jsonObj,jsonObj2); 

    //calling function to get Top 10 economical bowler
    let economyCount = matchesData.economyOfBowler(jsonObj,jsonObj2);

    //console.log(matchCount);
    //console.log(winningCount);
    //console.log(extraRunCount);
    //console.log(economyCount);

    //extracting output of Extra runs conceded per team in the year 2016 to json file
    fs.writeFileSync('../public/output/extraRunsPerTeam.json', JSON.stringify(extraRunCount),'utf-8', (error) => {
        if(error){
            console.log(error);
        }
    })

    
    //extracting output of matches played per Year to json file
    fs.writeFileSync('../public/output/matchesPerYear.json', JSON.stringify(matchCount),'utf-8', (error) => {
        if(error){
            console.log(error);
        }
    })
    
    
    //extracting output of winingcount(i.e matches won by per team per year) to json file
    fs.writeFileSync('../public/output/matchesPerYearPerTeam.json', JSON.stringify(winningCount),'utf-8', (error) => {
        if(error){
            console.log(error);
        }
    })

    //extracting outPut of Top10 Bowlers economical bowlers to json file
    fs.writeFileSync('../public/output/toptenEconomicalBowlers.json', JSON.stringify(economyCount),'utf-8', (error) => {
        if(error){
            console.log(error);
        }
    })
})
})

