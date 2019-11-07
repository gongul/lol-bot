# lol-bot 
현재 카카오톡 플러스친구 봇으로 활동하고 있는 "롤군"의 소스코드(REST API Server) 입니다. <br/>
https://pf.kakao.com/_vExkDT

## Overview
카카오톡 오픈빌더랑 상호작용하여 작동하기 때문에 현재 소스코드만으로는 정상작동 하기 않습니다.

  * 특정 플레이어 게임 상태 확인(플레이어 정보도 검색됨)
  * 레드팀,블루팀 플레이어 정보 보기
  * 현재 진행 중인 게임이 랭크,일반,URF 인지 구별 
  * 랭크일 시 현재 티어 출력

## Usage
노드 버전 8이상에서 작동됩니다.

#### Install 
```
git clone https://github.com/gongul/lol-bot.git
```

#### Setting
resources/riot/api-token.json.sample -> server/datasource.json 으로 변경 후 자신의 라이엇 API키를 넣어주세요   


#### Run
```
npm install

node main.js 
```

