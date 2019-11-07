const kakaoTemplate = require("../../resources/kakao/response-template");
const QUEUES = require("../../resources/riot/queues");

const ingame = (ingameInfo,player) => {
    const ingameTemplate = kakaoTemplate.ingameTemplate();
    
    const context = { "name":"gameInfo", "lifeSpan" : 2 , "params" : { "participants" : ingameInfo.participants , "gameQueueConfigId" : ingameInfo.gameQueueConfigId}}

    if(!ingameInfo.isPlaying) {
        context.lifeSpan = 0;
        ingameTemplate.template.quickReplies.splice(0,2);
    }

    ingameTemplate.context.values.push(context);
    ingameTemplate.template.outputs[0].basicCard.title = ingameInfo.title;
    ingameTemplate.template.outputs[0].basicCard.thumbnail.imageUrl = `http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/${player.profileIconId}.png`;
    ingameTemplate.template.outputs[0].basicCard.description = `레벨 : ${player.summonerLevel}`

    return ingameTemplate;
}

const players = (participants,teamId,gameQueueConfigId,players) => {
    const playersTemplate = kakaoTemplate.playersTemplate();
    const context = { "name":"gameInfo", "lifeSpan" : 1 , "params" : { "participants" : participants , "gameQueueConfigId" : gameQueueConfigId}}
    let teamName = "블루팀";
    let otherTeamName = "레드팀";
    let blockId = "5daf13a0ffa7480001db40ee";
    let rankKey = "";

    if(teamId == 200){
        teamName = "레드팀"
        otherTeamName = "블루팀";
        blockId = "5da413c48192ac0001158593"
    }

    if(QUEUES.RANKED_FLEX_5X5 == gameQueueConfigId){
        teamName += "(자유랭크)";
        rankKey = "RANKED_FLEX_SR"
    }  
    else if(QUEUES.RANKED_SOLO_5x5 == gameQueueConfigId){
        teamName += "(솔로랭크)";
        rankKey = "RANKED_SOLO_5x5"
    } else if(QUEUES.BLIDE_PICK_5x5 == gameQueueConfigId){
        teamName += "(일반게임)";
    }else if(QUEUES.URF_GAME == gameQueueConfigId){
        teamName += "(URF)";
    }

    const items = [];

    for(player of players){
        const json = { 
            "title": `${player.summonerName}`,
            "description": `레벨 : ${player.summonerLevel} `,
            "imageUrl": `http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png` // 소환사 아이콘 
        }
        
        // ${player.rank[rankKey].point} LP 포인트지만 카카오톡 길이 때문에 사용 보류
        if(QUEUES.RANKED_FLEX_SR == gameQueueConfigId || QUEUES.RANKED_SOLO_5x5 == gameQueueConfigId) json.description += `랭크 : ${player.rank[rankKey].tier} ${player.rank[rankKey].tierNumber}`

        items.push(json);
    }

    const listCard = {
        "listCard": {
            "header": {
                "title": teamName,
            },
            "items": items
        }
    }
    const quickReplies = {
        "label" : otherTeamName,
        "action" : "block",
        "messageText" : otherTeamName,
        "blockId" : blockId
    }

    playersTemplate.template.outputs.push(listCard);
    playersTemplate.template.quickReplies.unshift(quickReplies);
    playersTemplate.context.values.push(context);

    return playersTemplate;
}

exports.players = players;
exports.ingame = ingame;