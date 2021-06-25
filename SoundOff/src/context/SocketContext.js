import socketio from 'socket.io-client';
import { SOCKET_URL } from '../config';
import createDataContext from './createDataContext';

/**
 * Adjusts state based on action type and payload
 * @param state Current state of the context
 * @param action Contains the type and payload
 */
const socketReducer = (state, action) => {
    switch (action.type) {
        case 'set_socket':
            return {...state, socket: action.payload};
        default:
            return state;
    }
};

/**
 * Sets the socket
 * @param payload Contains the userToken to authenticate
 */
const setSocket = dispatch => (userToken) => {
    if (userToken) {
        mySocket = socketio.connect(SOCKET_URL, {
            query: { userToken }
        });
        dispatch({ type: 'set_socket', payload: mySocket });
    } else {
        console.log('No token')
    }
}

export const { Provider, Context } = createDataContext(
    socketReducer,
    { setSocket },
    { socket: null }
);