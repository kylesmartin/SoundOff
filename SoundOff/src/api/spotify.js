import axios from 'axios';

const spotify = axios.create({
    baseURL: 'https://api.spotify.com/v1'
});

/**
 * Called when users search for a new song
 * @param q Contains the query, usually an artist, a song, or an album
 * @param accessToken Contains the Spotify access token
 */
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
    return response.data;
}

export { search }