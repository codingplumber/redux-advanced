import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

// reducers are the place where you are meant to update state (pure, sync code only) - it's a core redux concept, action creators are not (used for async code)

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.resultElId);
    return updateObject(state, {results: updatedArray});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            // Change data here
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result * 2})});
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
    }
    return state;
};

export default reducer;

// using setTimeout to simulate storing on a server
// the reducer function has to run synchronously; we can only run asynchronous code with the help of action creators