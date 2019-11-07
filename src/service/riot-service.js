const riot = require("../utils/riot-api");
const kakaoTemplate = require("../utils/kakao-template");
const QUEUES = require("../../resources/riot/queues");

class RiotService{
    async findGameBySummonerName (summonerName){
        try{
            const summonerInfo = await riot.summonerSearch(summonerName);
            const ingameInfo = await riot.ingameSearch(summonerInfo);
            
            const result = kakaoTemplate.ingame(ingameInfo,summonerInfo);
    
            return result;
        }catch(e){
            throw e;
        }
    }

    async findSummonersByGamePlayer(gamePlayer,teamId,gameQueueConfigId){
        const players = gamePlayer.filter(player => player.teamId == teamId);   
        const summonerSearchFnArr = [];
        const rankSerachFnArr = [];

        for(let i=0;i<players.length;i++){
            summonerSearchFnArr.push(riot.summonerSearch);

            if(gameQueueConfigId == QUEUES.RANKED_FLEX_5X5 || gameQueueConfigId == QUEUES.RANKED_SOLO_5x5) rankSerachFnArr.push(riot.summonerRank);
        }

        try{
            let summoners = await Promise.all(summonerSearchFnArr.map((callback,index) => callback(players[index].summonerName,players[index])));


            if(rankSerachFnArr.length != 0 ) {
                summoners = await Promise.all(rankSerachFnArr.map((callback,index) => callback(summoners[index],gameQueueConfigId)));
            }

            return kakaoTemplate.players(gamePlayer,teamId,gameQueueConfigId,summoners)
        }catch(e){
            throw e;
        }
    }   
}


module.exports = RiotService;