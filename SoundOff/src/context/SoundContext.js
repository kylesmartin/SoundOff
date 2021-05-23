import createDataContext from './createDataContext';

const soundReducer = async (state, action) => {
    switch (action.type) {
        case 'set_song':
            return { song: action.payload.song };
        default:
            return state;
    }
};

const setSong = dispatch => (song) => {
    dispatch({ type: 'set_song', payload: song });
}

export const { Provider, Context } = createDataContext(
    soundReducer,
    { setSong },
    { song: null }
);