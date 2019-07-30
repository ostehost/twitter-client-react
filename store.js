import { createStore, combineReducers, applyMiddleware } from 'redux'

import tweetsReducer from './reducers/tweetsReducer';
import { initialState as tweetsInitialState } from './reducers/tweetsReducer';

import { combineEpics, createEpicMiddleware } from 'redux-observable';
import tweetsEpic from './epics/tweetsEpic';

export const initialState = {
    tweetsReducer: tweetsInitialState
}

export function initializeStore(preloadedState = initialState) {
    const epicMiddleware = createEpicMiddleware();

    const store = createStore(
        combineReducers({
            tweetsReducer
        }),
        preloadedState,
        applyMiddleware(epicMiddleware)
    )

    epicMiddleware.run(combineEpics(
        tweetsEpic
    ));

    return store;
}