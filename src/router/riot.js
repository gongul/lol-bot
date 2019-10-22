const express = require("express"); 
const router = express.Router();
const kakaoTemplate = require("../../resources/kakao/response-template");
const riot = require("../utils/riot-api");


router.post('/getBlockId',(req,res) => {
    console.log(req.body);

    res.send("end");
});

// 게임 정보 riot api를 사용해야함 레벨 or 랭크가 안보임  
// teamId 100 블루 , 200  레드
router.post('/ingame/summoners/blue',(req,res) => {
    if(!req.body.contexts) res.status(200).send("");

    const gameInfo = req.body.contexts[0];
    const players = JSON.parse(gameInfo.params.participants.value);
    const playersTemplate = kakaoTemplate.playersTemplate();

    for(player of players){
        if(player.teamId == 200){
            const json = { 
                "title": `${player.summonerName}`,
                "description": `레벨 : ?`,
                "imageUrl": `http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png` // 소환사 아이콘 
            }

            playersTemplate.template.outputs[0].listCard.items.push(json);
        }
    }

    playersTemplate.template.outputs[0].listCard.header.title = "블루팀";

    res.status(200).send(playersTemplate);
});


router.post('/ingame',async (req,res,next)=>{
    const summonerName = req.body.action.params.lolName;
    const ingameTemplate = kakaoTemplate.ingameTemplate();

    try{
        const summonerInfo = await riot.summonerSearch(summonerName);
        const ingameInfo = await riot.ingameSearch(summonerInfo);
        
        if(ingameInfo.isPlaying) {
            ingameTemplate.context.values[0].params.participants = ingameInfo.participants;
        }
        else{
            ingameTemplate.context.values[0].lifeSpan = 0;
            ingameTemplate.template.quickReplies.splice(0,1);
        } 

        ingameTemplate.template.outputs[0].basicCard.title = ingameInfo.title;
        ingameTemplate.template.outputs[0].basicCard.thumbnail.imageUrl = `http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/${summonerInfo.profileIconId}.png`;
        ingameTemplate.template.outputs[0].basicCard.description = `레벨 : ${summonerInfo.summonerLevel}`
    }catch(e){
        return res.status(200).send(e.template);
    }

    res.status(200).send(ingameTemplate);
})


module.exports = router;