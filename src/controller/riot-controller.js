const RiotService = require('../service/riot-service');

class RiotController{
    constructor(){
        this.riotService = new RiotService();
    }

    async findGame (req,res,next){
        const summonerName = req.body.action.params.lolName;
        let game = null;

        try{
            game = await this.riotService.findGameBySummonerName(summonerName);
        }catch(e){
            return res.status(200).send(e.template);
        }

        return res.status(200).send(game);
    }
    
    beforeFindSummoners(req,res,next){
        const {teamId} = req.params;
        const {contexts} = req.body;

        if(!contexts || contexts.lenght == 0) return res.status(200).send("");
        else if(teamId == null || (teamId != "100" && teamId != "200")) return res.status(200).send("");

        return next();
    }

    async findSummoners(req,res,next){
        const {teamId} = req.params;
        const {contexts} = req.body;

        const players = JSON.parse(contexts[0].params.participants.value);
        const gameQueueConfigId = contexts[0].params.gameQueueConfigId.value;

        let summoners;

        try{
            summoners =  await this.riotService.findSummonersByGamePlayer(players,teamId,gameQueueConfigId);
        }catch(e){
            return res.status(200).send(e.template);
        }
        
        return res.status(200).send(summoners);
    }
}

module.exports = RiotController;