import * as actionTypes from '../actions/actionTypes';

// reducers are the place where you are meant to update state (pure, sync code only) - it's a core redux concept, action creators are not (used for async code)

const initialState = {
    results: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            // Change data here
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result * 2})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;

// using setTimeout to simulate storing on a server
// the reducer function has to run synchronously; we can only run asynchronous code with the help of action creators