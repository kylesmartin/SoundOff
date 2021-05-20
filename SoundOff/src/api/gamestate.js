import axios from 'axios';

const gamestate = axios.create({
    baseURL: 'https://a9e33ebc41cf.ngrok.io'
});

const roomGet = async (roomID, roomKey) => {
    
    const token = await gamestate.post(

        '/signin',

        {
            headers: {
                'Content-Type': 'application/json'
            },

            body: {
                "email": "test@test.com",
                "password": "mypassword"
            }
        }
    )

    const response = await gamestate.get(

        '/room',

        { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },

            body: {
                'roomID': roomID,
                'roomKey': roomKey
            }
        }
    )
    
    return response.data
}

const roomPost = async (roomID, randomKey) => {
    
    const token = await gamestate.post(

        '/signin',

        {
            "email": "test@test.com",
            "password": "mypassword"
        },
        
        {
            headers: 
            {
                'Content-Type': 'application/json'
            }
        }
    )

    const response = await gamestate.post(
        '/room',

        {
            "roomId": roomID,
            "roomKey": randomKey,
            "gameState": {
                "songCategory": "",
                "currentJudge": "",
                "currentSong": "",
                "countDown": -1
            }
        },
        
        { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.data.token,
            }
            
        }
    )
    
    return response.data

}

export { roomGet, roomPost }