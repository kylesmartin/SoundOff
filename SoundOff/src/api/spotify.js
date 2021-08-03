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

/**
 * Called when users search for a song by its id
 * @param id Contains the song id
 * @param accessToken Contains the Spotify access token
 */
 const searchById = async (id, accessToken) => {
    const response = await spotify.get(
        `/tracks/${id}`,
        { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }
        }
    )
    return response.data;
}

export { search, searchById }