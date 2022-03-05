//function to calculate Matches per year
let matchesPerYear = (array) => {
    return array.reduce(function(obj, element){
        if (!obj[element['season']]){
            obj[element['season']] = 1;
        } else {
            obj[element['season']]++;
        }
        return obj;
    
    },{});
}

///function to calculate mataches per year per team
let matchesPerYearPerTeam = (array) => {
    return array.reduce((obj,element) => {
        if (!obj[element['season']]){
            obj[element['season']] = {};

            let winnerObj = array.reduce((obj2,ele2) => {
                //checking for each year
                if(ele2['season'] === element['season']){
                    //creating object for per year
                    if(!obj2[ele2['winner']]){
                        obj2[ele2['winner']] =1;
                    }else {
                        obj2[ele2['winner']]++
                    }
                }
                return obj2;
            },{})
            //adding winning data to corosponding year
            obj[element['season']] = winnerObj;
            
        }
        return obj;
    },{})
}

//function to calculate runs conceded by per team in a given year(i.e 2016)
let extraRunsPerTeam = (array1, array2) => {
    return array1.reduce((obj, element) => {
        if(element['season'] === '2016'){
            let matchId = element['id'];

            //creating object for year 2016
            if(!obj[element['season']]){
                obj[element['season']] = {};
            }

            //calculating extra runs per match for each team
            let extraRuns = array2.reduce((obj2, ele2) => {
                if(ele2['match_id'] === matchId){
                    if(!obj2[ele2['bowling_team']]){
                        obj2[ele2['bowling_team']] = Math.floor(ele2['extra_runs']);
                    } else {
                        obj2[ele2['bowling_team']] += Math.floor(ele2['extra_runs']);
                    }
                }
                return obj2;
            },{})
            //pusing extra run of each match corosponding to relative team
            let extraRunkeys = Object.keys(extraRuns);
            extraRunkeys.map(key => {
                if(!obj[element['season']][key]){
                    obj[element['season']][key] = extraRuns[key]
                }else {
                    obj[element['season']][key] += extraRuns[key]
                }
            })           
        }
        return obj;
    },{})
}

//function to calculate economy of bowler in 2015
let economyOfBowler = (array1,array) => {
    ////getting id for year 2015
    // let idArray = [];
    // array1.map(value => {
    //     if(value['season'] =='2015'){
    //         idArray.push(Math.floor(value['id']));
    //     }
    // })
    //up here idArray[0] = 518 and idArray[aiArray.length -1] = 576

    let runsAndBalls = array.reduce((object, element) => {
        //checking data for year 2015 only
        if(Math.floor(element['match_id']) >= 518 && Math.floor(element['match_id']) <= 576){
            //if bowler is not in object
            if(!object[element['bowler']]){
                let ball =0, runs = 0,eco,over;
                //traversing the array to find data for the bowler in 2015
                let playerEconomy = array.reduce((object2,element2) => {
                    if(Math.floor(element2['match_id']) >= 518 && Math.floor(element2['match_id']) <= 576){
                        if(element2['bowler'] === element['bowler']){
                            //checking ball must not be a wide ball or no ball
                            if(element2['wide_runs'] === '0' && element2['noball_runs'] === '0'){
                                ball++
                            }
                            runs += Math.floor(element2['total_runs']);
                            over = Math.floor(ball/6);
                            eco = runs/over;
                            //object2['runs'] = runs;
                            //object2['ball'] = ball;
                            object2['economy'] = Math.round(eco*100)/100;
                        }
                    }
                    //object2 will return economy of a particular bowler
                    return object2;
                },{})
                //assigning economy against bowler name
                object[element['bowler']] = playerEconomy.economy;
            }
        }  
        //returning object with bowler name and his economy 
        return object;
    },{})


    //***sorting the object
    const sortedEconomy= Object.fromEntries(
        Object.entries(runsAndBalls).sort(([,a],[,b]) => a-b)
    );

    //*** slicing top 10 bowlers*/
    const topTen = Object.fromEntries(Object.entries(sortedEconomy).slice(0, 10));
    
    return topTen;
    //return sortedEconomy;
    //return runsAndBalls;
}

module.exports ={ matchesPerYear, matchesPerYearPerTeam, extraRunsPerTeam, economyOfBowler };