import createDataContext from './createDataContext';
import spotify from '../api/spotify';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { accessToken: action.payload.access_token, refreshToken: action.payload.refresh_token, permissionRequired: false };
        case 'get_permissions':
            return { accessToken: '', refreshToken: '', permissionRequired: true };
        default:
            return state;
  }
};

// TODO: refractor this function
const login = dispatch => async () => {
  const response = await spotify.get('/login');
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
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, checkWebViewResponse },
  { accessToken: '', refreshToken: '', permissionRequired: false }
);