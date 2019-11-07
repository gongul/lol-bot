const express = require("express"); 
const router = express.Router();
const RiotController = require("../controller/riot-controller");
const riot = new RiotController();


router.
    route('/ingame').
        post(riot.findGame.bind(riot))
        

// 게임 정보 riot api를 사용해야함 레벨 or 랭크가 안보임  
// teamId 100 블루 , 200  레드
router.
    use('/ingame/summoners/:teamId',riot.beforeFindSummoners.bind(riot)).
    route('/ingame/summoners/:teamId').    
        post(riot.findSummoners.bind(riot))


module.exports = router;