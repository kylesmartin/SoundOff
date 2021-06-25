import createDataContext from './createDataContext';
import server from '../api/server';
import { navigate } from '../navigationRef';

/**
 * Adjusts state based on action type and payload
 * @param state Current state of the context
 * @param action Contains the type and payload
 */
const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { ...state, userToken: action.payload };
    case 'login_to_spotify':
      return { ...state, accessToken: action.payload.access_token, refreshToken: action.payload.refresh_token, permissionRequired: false };
    case 'get_permissions':
      return { ...state, accessToken: '', refreshToken: '', permissionRequired: true };
    case 'refresh_token':
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

/**
 * Signs into the application
 * @param email User email stored in server database
 * @param password User password stored in server database
 */
const signin = dispatch => async (email, password) => {
  try {
    const response = await server.post(
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
    );
    dispatch({ type: 'signin', payload: response.data.token });
    // Navigate to spotify login after user login
    navigate('SpotifyLogin');
  } catch (err) {
    console.log(err);
  }
};

/**
 * Signs into Spotify account
 */
const loginToSpotify = dispatch => async () => {
  const response = await server.get('/spotifylogin');
  if (typeof(response.data) == 'string') {
    if (response.data.includes('<!DOCTYPE html>')) {
      dispatch({ type: 'get_permissions' });
    }
  } else {
    dispatch({ type: 'login_to_spotify', payload: response.data });
    navigate('Menu');
  }
};

/**
 * Checks response given by webview after Spotify access granted
 * @param response Http response sent from server after Spotify access granted
 */
const checkWebViewResponse = dispatch => (response) => {
  if (response.url.includes('access_token')) {
    // Parse tokens
    const access_token = response.url.split('?')[1].split('&')[0].split('=')[1];
    const refresh_token = response.url.split('?')[1].split('&')[1].split('=')[1];
    dispatch({ type: 'login_to_spotify', payload: {access_token, refresh_token} });
    // Go to menu
    navigate('Menu');
  }
};

/**
 * Refreshes Spotify access token
 * @param refresh_token Spotify refresh token
 */
const refreshAccessToken = dispatch => async (refresh_token) => {
  if (refresh_token) {
    const response = await server.get(
      '/refresh_token',
      { params: { refresh_token } }
    );
    dispatch({ type: 'refresh_token', payload: response.data.access_token });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, loginToSpotify, checkWebViewResponse, refreshAccessToken },
  { userToken: '', accessToken: '', refreshToken: '', permissionRequired: false }
);