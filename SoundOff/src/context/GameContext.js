import createDataContext from './createDataContext';

/**
 * Adjusts state based on action type and payload
 * @param state Current state of the context
 * @param action Contains the type and payload
 */
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'set_ids':
            return {...state, gameId: action.payload.gameId, socketId: action.payload.mySocketId};
        default:
            return state;
    }
};

/**
 * Sets the current game id and socket id the client is connected to
 * @param payload Contains the game id and socket id
 */
const setIds = dispatch => (payload) => {
    dispatch({ type: 'set_ids', payload });
}

export const { Provider, Context } = createDataContext(
    gameReducer,
    { setIds },
    { gameId: null, socketId: '' }
);