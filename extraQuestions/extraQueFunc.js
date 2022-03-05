
//function to find teams won toss and match together
function tossAndMatchWinner(array){
    return array.reduce((object,element) => {
        if(element['toss_winner'] === element['winner']){
            if(object[element['toss_winner']]){
                object[element['toss_winner']] ++ 
            } else {
                object[element['toss_winner']] = 1;
            }
        }
        return object;
    },{})
}

//function to find player who has won the highest number of Player of the Match awards for each season
function playerOfTheMatch(array){
    return array.reduce((object,element) => {

        //defining object for each season
        if(!object[element['season']]){
            object[element['season']] = {};

            let player = {};
            //map function to count player of the match won by players in a particular season
            array.map(object2 => {
                if(object2['season'] === element['season']){
                    if(!player[object2['player_of_match']]){
                        player[object2['player_of_match']] =1
                    } else {
                        player[object2['player_of_match']]++
                    }
                }
            })

            //accessing player with highest player of match
            highestScorer = Object.keys(player).reduce((a, b) => player[a] > player[b] ? a : b);

            //if multiple players have same number of player of match 
            let forSameCount = [];
            Object.keys(player).map(ele => {
                if(player[ele] === player[highestScorer]){
                    forSameCount.push(ele);
                    //forSameCount[ele] = player[ele];
                }
            })

            //storing value in object
            object[element['season']] = forSameCount;
        }
        return object;
    },{})

}


//function to find strike rate of batsman in each season 
function strikeRateOfBatsman(array,array1){
    return array.reduce((object, element) => {
        if(!object[element['season']]){
            //let matchId = element['id'];
            //creating object for eacah season
            object[element['season']] ={};

            //calculating strike rate of batsman in particular season
            let strikeRate = {}
            array.map(obj => {
                if(obj['season'] === element['season']){
                    matchId = obj['id'];

                    //checking deliveries file of scores
                    array1.map(obj2 => {
                        if(obj2['match_id'] === matchId){
                            if(!strikeRate[obj2['batsman']]){
                                strikeRate[obj2['batsman']] = {};
                                
                                strikeRate[obj2['batsman']]['ball'] = 1;
                                strikeRate[obj2['batsman']]['runs'] = Math.floor(obj2['batsman_runs']);
                                let rate = (strikeRate[obj2['batsman']]['runs']/strikeRate[obj2['batsman']]['ball'])*100;
                                strikeRate[obj2['batsman']]['strike_rate'] = rate.toFixed(3);
                            } else {
                                strikeRate[obj2['batsman']]['ball']++;
                                strikeRate[obj2['batsman']]['runs'] += Math.floor(obj2['batsman_runs']);
                                rate = (strikeRate[obj2['batsman']]['runs']/strikeRate[obj2['batsman']]['ball'])*100;
                                strikeRate[obj2['batsman']]['strike_rate'] = rate.toFixed(3);
                            }
                        }
                    })
                }
            })

            object[element['season']] = strikeRate;
        }
        return object;
    },{})
}

//function to find bowler with best economy in a super over
function economyInSuperOver(array) {
    let bowler = {};
    //let economy = {};
    array.map(obj => {
        if(obj['is_super_over'] === '1'){
            if(!bowler[obj['bowler']]){
                bowler[obj['bowler']] = {}
                bowler[obj['bowler']]['ball'] =1
                bowler[obj['bowler']]['over'] = 1;
                bowler[obj['bowler']]['runs'] = Math.floor(obj['total_runs']);
                let eco = bowler[obj['bowler']]['runs']/bowler[obj['bowler']]['over']
                bowler[obj['bowler']]['economy'] = eco.toFixed(3)
            } else {
                //checking ball must not be a wide ball or no ball
                if(obj['wide_runs'] === '0' && obj['noball_runs'] === '0'){
                    bowler[obj['bowler']]['ball']++
                }
                bowler[obj['bowler']]['over'] = Math.ceil(bowler[obj['bowler']]['ball']/6);
                bowler[obj['bowler']]['runs'] += Math.floor(obj['total_runs']);
                eco = bowler[obj['bowler']]['runs']/bowler[obj['bowler']]['over']
                bowler[obj['bowler']]['economy'] = eco.toFixed(3)
            }
        }
    })

    //accessing player with best economy match
    bestEconomyPlayer = Object.keys(bowler).reduce((a, b) => Math.floor(bowler[a]['economy']) < Math.floor(bowler[b]['economy']) ? a : b);

    //if multiple players have same economy
    let forMultiPlayer = [];
    Object.keys(bowler).map(ele => {
        if(bowler[ele]['economy'] === bowler[bestEconomyPlayer]['economy']){
            forMultiPlayer.push(ele);
        }
    })
    
    return forMultiPlayer;
    //return bestEconomyPlayer;
    //return bowler;
}

//function to find highest number of times player dismissed by another player
function playerDismissedByAnotherPlayer(array){
    return array.reduce((object, element) => {
        if(element['palyer_dismissed'] !== ''){
            if(!object[element['player_dismissed']]){
            object[element['player_dismissed']] = {};

            let disPlayer = {};
            array.map(object2 => {
                if(object2['player_dismissed'] === element['player_dismissed']){
                    if(!disPlayer[object2['bowler']]){
                        disPlayer[object2['bowler']] = 1;
                    } else {
                        disPlayer[object2['bowler']]++
                    }
                }
            })
            //BELOW COMMENTED CODE IS ALSO WORKING

            //finding which player dismissed another player highest number of times
            HightCountPlayer = Object.keys(disPlayer).reduce((a,b) => disPlayer[a] > disPlayer[b] ? a: b);

            //storing value
            object[element['player_dismissed']] = HightCountPlayer;



            // //showing how many times a palyers is dismissed by another player
            // object[element['player_dismissed']] = disPlayer; 
        }
        return object;
        }
    },{})
}


module.exports = {
    tossAndMatchWinner,
    playerOfTheMatch,
    strikeRateOfBatsman, economyInSuperOver, playerDismissedByAnotherPlayer};