const axios = require("axios");
const kakaoTemplate = require("../../resources/kakao/response-template");
const riotToken = require("../../resources/riot/api-token.json").token;
const RANK = require("../../resources/riot/rank");

/**
 * 
 * http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/
 * https://riot-api-libraries.readthedocs.io/en/latest/ddragon.html icon version
 * http://ddragon.leagueoflegends.com/cdn/:version(9.20.1)/img/profileicon/:profileNumber.png how to use icon 
 * 
 * 
 */


const summonerSearch = async(summonerName,gamePlayer = null) => {
    const errorTemplate = kakaoTemplate.errorTemplate();
    
    const url = encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`);
    
    try{    
        const summonerSearchResult = await axios.get(url,{
            headers:{
                "X-Riot-Token": riotToken
            }
        });

      
        summonerInfo = summonerSearchResult.data;
    
        if(gamePlayer){
            gamePlayer['summonerLevel'] = summonerInfo.summonerLevel;

            return gamePlayer;
        }

        return summonerInfo;
    }catch(e){
        let errMessage = "";

        if(e.response.status === 403){
            errMessage = "라이엇 키가 만료되었습니다."
        }else if(e.response.status === 404){
            errMessage = "없는 소환사입니다.";
        }else if(e.response.status === 429){
            errMessage = "요청 한도 초과 잠시 후에 시도해주세요.";
        }else{
            errMessage = "알 수 없는 에러입니다.";
        }
        
        errorTemplate.template.outputs[0].simpleText.text = errMessage;

     
        throw {
            template: errorTemplate,
            error : e
        }
    }

}

const ingameSearch = async (summonerInfo) => {
    const errorTemplate = kakaoTemplate.errorTemplate();
    let error = null;
    const ingameData = {
        isPlaying : false,
        title : "",
        participants : "",
        gameQueueConfigId : 0
    }

    // gameStartTime가 몇분 이하는 0으로 뜸 확인
    try{
        const url = `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerInfo.id}`;

        const ingameSearchResult = await axios.get(url,{
            headers:{
                "X-Riot-Token": riotToken
            }
        });


        const {gameQueueConfigId,gameStartTime,participants} = ingameSearchResult.data;
        const currentTime = new Date().getTime();
        const runningTime = Math.floor(((currentTime - gameStartTime) / 1000) / 60);

        ingameData.gameQueueConfigId = gameQueueConfigId;
        ingameData.participants =  participants;
        ingameData.title = `${summonerInfo.name} (게임중 : 진행시간 ${runningTime}분)`;
        ingameData.isPlaying = true;
    }catch(e){
        let errMessage = "";
        error = e;

        if(e.response.status === 403){
            errMessage = "라이엇 키가 만료되었습니다."
        }else if(e.response.status === 404){
            ingameData.title = `${summonerInfo.name} (게임 중이 아닙니다)`;
        }else if(e.response.status === 429){
            errMessage = "요청 한도 초과 잠시 후에 시도해주세요.";
        }else{
            errMessage = "알 수 없는 에러입니다.";
        }

        errorTemplate.template.outputs[0].simpleText.title = errMessage;
    }

    if(error != null && error.response.status != 404){
        throw {
            template: errorTemplate,
            error : error
        }
    }

    return ingameData;

}




const summonerRank = async (summonerInfo,rankFilter) => {
    let rankSearchResult;
    const errorTemplate = kakaoTemplate.errorTemplate();
    
    try{
        const url = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfo.summonerId}`;
        
        rankSearchResult = await axios.get(url,{
            headers:{
                "X-Riot-Token": riotToken
            }
        });

    }catch(e){
        let errMessage = "";

        if(e.response.status === 403){
            errMessage = "라이엇 키가 만료되었습니다."
        }else if(e.response.status === 404){
            errMessage = "랭크가 없습니다.";
        }else if(e.response.status === 429){
            errMessage = "요청 한도 초과 잠시 후에 시도해주세요.";
        }else{
            errMessage = "알 수 없는 에러입니다.";
        }

        errorTemplate.template.outputs[0].simpleText.title = errMessage;

        throw {
            template: errorTemplate,
            error : e
        }
    }


    const ranks = {"RANKED_FLEX_SR":null,"RANKED_SOLO_5x5":null};
        
    for(rank of rankSearchResult.data){
        const {queueType,tier,leaguePoints} = rank;
        const ququeCode = RANK[queueType];

        if(rankFilter != null && rankFilter != ququeCode) continue; 
        
        const rankInfo = {
            'tierNumber' : rank.rank,
            "ququeCode" : ququeCode,
            "tier" : tier,
            "point" : leaguePoints
        }
        
        ranks[queueType] = rankInfo;
    }

    summonerInfo['rank'] = ranks;
   
    return summonerInfo;
}

exports.summonerRank = summonerRank;
exports.summonerSearch = summonerSearch;
exports.ingameSearch = ingameSearch; 

// http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/
// 모두 0 , 블루 1 , 레드 2
// const getPlayers = async (players,filter) => {
//     const errorTemplate = kakaoTemplate.errorTemplate();

//     if(players) {
//         errorTemplate.template.outputs[0].simpleText.title = "플레이어 데이터가 없습니다";

//         throw {
//             template: errorTemplate,
//             error :  new Error("플레이어 데이터가 없습니다")
//         }
//     }


//     switch (filter) {
//         case 0:
            
//             break;
//         case 1:
            
//             break;

//         case 2:
        
//             break;
//         default:
//             break;
//     }
// }

