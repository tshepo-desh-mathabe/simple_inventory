import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import navReducer from './nav_state/reducer';
import httpResponse from './http_state/reducer';

const myLogger = (store) => (next) => (action) => {
    console.log('Logged Action', action);
    next(action);
}

const store = createStore(
    combineReducers(
        {
            user: navReducer,
            http_responses: httpResponse,
        }),
    {},
    applyMiddleware(myLogger, createLogger())
);

export default store;
