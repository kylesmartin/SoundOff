import axios from 'axios';

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

const search = async (q, accessToken) => {
    const response = await spotify.get(
        '/search',
        { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            params: {
                q,
                type: 'track'
            }
        },
    )
    return response.data
}

export { search }