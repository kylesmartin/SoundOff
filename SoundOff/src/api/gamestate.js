import axios from 'axios';

const gamestate = axios.create({
    baseURL: 'https://5f4f401e8dde.ngrok.io'
});

const signIn = async (email, password) => {

    const token = await gamestate.post(

        '/signin',

        {
            "email": email,
            "password": password
        },

        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return token
}

const roomGet = async (roomID, roomKey, token) => {

    const response = await gamestate.get(

        '/room',

        {
            'roomID': roomID,
            'roomKey': roomKey
        },

        { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }
    )
    
    return response.data
}

const roomPost = async (roomID, randomKey, token) => {

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
                'Authorization': 'Bearer ' + token,
            }
            
        }
    )
    
    return response.data

}

export { signIn, roomGet, roomPost }