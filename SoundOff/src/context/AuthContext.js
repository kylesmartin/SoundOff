import createDataContext from './createDataContext';
import server from '../api/server';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { accessToken: action.payload.access_token, refreshToken: action.payload.refresh_token, permissionRequired: false };
        case 'get_permissions':
            return { accessToken: '', refreshToken: '', permissionRequired: true };
        case 'refresh_token':
            return { ...state, accessToken: action.payload };
        default:
            return state;
  }
};

// TODO: refractor this function
const login = dispatch => async () => {
  const response = await server.get('/login');
  if (typeof(response.data) == 'string') {
    if (response.data.includes('<!DOCTYPE html>')) {
      dispatch({ type: 'get_permissions' });
    }
  } else {
    dispatch({ type: 'login', payload: response.data });
    navigate('Menu');
  }
};

const checkWebViewResponse = dispatch => (response) => {
  if (response.url.includes('access_token')) {
    const access_token = response.url.split('?')[1].split('&')[0].split('=')[1];
    const refresh_token = response.url.split('?')[1].split('&')[1].split('=')[1];
    dispatch({ type: 'login', payload: {access_token, refresh_token} });
    navigate('Menu');
  }
};

const refreshAccessToken = dispatch => async (refresh_token) => {
  if (refresh_token) {
    const response = await server.get(
      '/refresh_token',
      { params: { refresh_token } }
    );
    console.log(response.data.access_token)
    dispatch({ type: 'refresh_token', payload: response.data.access_token })
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, checkWebViewResponse, refreshAccessToken },
  { accessToken: '', refreshToken: '', permissionRequired: false }
);