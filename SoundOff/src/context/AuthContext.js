import createDataContext from './createDataContext';
import server from '../api/server';
import { navigate } from '../navigationRef';
import {signIn} from '../api/gamestate';

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

// signin to app
const signin = dispatch => async () => {
  try {
    const response = await signIn("kyle@gmail.com", "pass");
    dispatch({ type: 'signin', payload: response.data.token });
    navigate('SpotifyLogin');
  } catch (err) {
    console.log(err)
  }
};

// login to spotify
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

const checkWebViewResponse = dispatch => (response) => {
  if (response.url.includes('access_token')) {
    const access_token = response.url.split('?')[1].split('&')[0].split('=')[1];
    const refresh_token = response.url.split('?')[1].split('&')[1].split('=')[1];
    dispatch({ type: 'login_to_spotify', payload: {access_token, refresh_token} });
    navigate('Menu');
  }
};

const refreshAccessToken = dispatch => async (refresh_token) => {
  if (refresh_token) {
    const response = await server.get(
      '/refresh_token',
      { params: { refresh_token } }
    );
    dispatch({ type: 'refresh_token', payload: response.data.access_token })
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, loginToSpotify, checkWebViewResponse, refreshAccessToken },
  { userToken: '', accessToken: '', refreshToken: '', permissionRequired: false }
);