import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// redux-thunk allows your action creators to not return an action itself, but to return a function which will eventually dispatch an action, this allows us to run asychronous code
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

// middleware
const logger = store => {
    // next is a function to let the action continue on to the reducer
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            // next lets action continue to reducer
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

// allows us to use the redux devtools
// compose is default compose function on redux - allows us to combine enhancers (i.e. devtools enchancers with our middleware)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// add middleware here
// second argument is enhancer - middleware
// can pas a list to applyMiddleware that will be executed in order
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
