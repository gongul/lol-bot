exports.errorTemplate = () => {
    return {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": "잘못된 접근입니다."
                    }
                }
            ],
            "quickReplies": [
                {
                    "label": "게임 중인지 확인해보기",
                    "action": "block",
                    "blockId": "5da1b11f92690d0001a46e94",
                    "messageText": "게임 중인지 확인해보기"
                }
            ]
        }
    }
},

exports.ingameTemplate = () => { 
    return {
        "version": "2.0",
        "context": {
            "values": [
               
            ]   
        },
        "template": {
            "outputs": [
                {
                    "basicCard": {
                        "title": "",
                        "description": "",
                        "thumbnail": {
                            "imageUrl": ""
                        }
                    }
                }
            ], 
            "quickReplies": [
                {
                    "label": "레드팀",
                    "action": "block",
                    "blockId": "5daf13a0ffa7480001db40ee",
                    "messageText": "레드팀"
                },
                {
                    "label": "블루팀",
                    "action": "block",
                    "blockId": "5da413c48192ac0001158593",
                    "messageText": "블루팀"
                },
                {
                    "label": "게임 중인지 확인해보기",
                    "action": "block",
                    "blockId": "5da1b11f92690d0001a46e94",
                    "messageText": "게임 중인지 확인해보기"
                }
            ]
        }
    }
},

exports.playersTemplate = () => {
    return {
        "version": "2.0",
        "context": {
            "values": [
            ]   
        },
        "template": {
            "outputs": [
               
            ], 
            "quickReplies": [
                {
                    "label": "게임 중인지 확인해보기",
                    "action": "block",
                    "blockId": "5da1b11f92690d0001a46e94",
                    "messageText": "게임 중인지 확인해보기"
                }
            ]
        }
    }
}


exports.test = () => {
    return {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "carousel": {
                        "type": "basicCard",
                        "items": [
                            {
                                "title": "보물상자",
                                "description": "보물상자 안에는 뭐가 있을까",
                                "thumbnail": {
                                "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                                },
                                "buttons": [
                                    {
                                        "action": "message",
                                        "label": "열어보기",
                                        "messageText": "짜잔! 우리가 찾던 보물입니다"
                                    },
                                    {
                                        "action":  "webLink",
                                        "label": "구경하기",
                                        "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
                                    }
                                ]
                            },
                            {
                                "title": "보물상자2",
                                "description": "보물상자2 안에는 뭐가 있을까",
                                "thumbnail": {
                                "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                                },
                                "buttons": [
                                    {
                                        "action": "message",
                                        "label": "열어보기",
                                        "messageText": "짜잔! 우리가 찾던 보물입니다"
                                    },
                                    {
                                        "action":  "webLink",
                                        "label": "구경하기",
                                        "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
                                    }
                                ]
                            },
                            {
                                "title": "보물상자3",
                                "description": "보물상자3 안에는 뭐가 있을까",
                                "thumbnail": {
                                "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                                },
                                "buttons": [
                                    {
                                        "action": "message",
                                        "label": "열어보기",
                                        "messageText": "짜잔! 우리가 찾던 보물입니다"
                                    },
                                    {
                                        "action":  "webLink",
                                        "label": "구경하기",
                                        "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }
}