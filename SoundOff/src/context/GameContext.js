import createDataContext from './createDataContext';

/**
 * Adjusts state based on action type and payload
 * @param state Current state of the context
 * @param action Contains the type and payload
 */
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'set_game_id':
            return {...state, gameId: action.payload};
        case 'set_socket_id':
            return {...state, socketId: action.payload};
        default:
            return state;
    }
};

/**
 * Sets the current game id
 * @param gameId Contains the game id
 */
const setGameId = dispatch => (gameId) => {
    dispatch({ type: 'set_game_id', payload: gameId });
}

/**
 * Sets the current socket id
 * @param socketId Contains the socket id
 */
 const setSocketId = dispatch => (socketId) => {
    dispatch({ type: 'set_socket_id', payload: socketId });
}

export const { Provider, Context } = createDataContext(
    gameReducer,
    { setGameId, setSocketId },
    { gameId: null, socketId: '' }
);