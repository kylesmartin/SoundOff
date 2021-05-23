
const InitRoomObject = ({roomId, roomKey}) => {

    return {

        "roomId": roomId,
        "roomKey": roomKey,
        "gameState": 
          
          {
              "songCategory": "",
              "currentJudge": "",
              "currentSong": "",
              "countDown": -1
          }
    }

}

export default {InitRoomObject};