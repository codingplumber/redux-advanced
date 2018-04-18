import * as actionTypes from './actionTypes';

// action creators are functions that create actions

// redux-thunk allows your action creators to not return an action itself, but to return a function which will eventually dispatch an action, this allows us to run asychronous code

////////////////////////////////////////
// using redux-think to dispatch middleware for async 
export const saveResult = res => {
    // const updatedResult = res * 2
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

// this function is used to run our async code, and then it dispatches our synch action to change the state in the store once finished

// export const storeResult = (res) => {
//     // we get dispatch in here due to redux-thunk
//     return dispatch => {
//         setTimeout(() => {
//             // pass our parameter res on
//             dispatch(saveResult(res));
//         }, 2000);
//     }
// };

// redux-thunk can also pass us an additional argument - getState
// sometimes we will need to reach out to the state prior to a given action - e.x. getting id from user in state to do stuff with
// don't overuse this, can just pass the data as an argument with res
export const storeResult = (res) => {
    // we get dispatch in here due to redux-thunk
    return (dispatch, getState) => {
        setTimeout(() => {
            // getState ///////
            const oldCounter = getState().ctr.counter;
            console.log(oldCounter)
            // pass our parameter res on
            dispatch(saveResult(res));
        }, 2000);
    }
};
/////////////////////////////////////////

export const deleteResult = (id) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: id
    };
};