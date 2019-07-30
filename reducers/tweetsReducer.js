import sortItems from '../lib/sortItems'

import actionTypes from '../actions/actionTypes';

export const initialState = {
    search: '',
    count: '10',
    type: false,
    tweets: [],
    tweets_loading: false,
    sort_by: 'created_at',
    sort_order: 1,
    error: null
}

const tweetsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TYPE:
            return { ...state, type: action.value };
        case actionTypes.CHANGE_COUNT:
            return { ...state, count: action.value };
        case actionTypes.CHANGE_SEARCH:
            return { ...state, search: action.value };
        case actionTypes.LOAD_TWEETS:
            return { ...state, tweets: [], tweets_loading: true };
        case actionTypes.TWEETS_LOADED:
            let tweets = action.append ? [action.payload, ...state.tweets] : action.payload;
            sortItems(tweets, state.sort_by, state.sort_order);
            return { ...state, error: null, tweets: tweets, tweets_loading: false };
        case actionTypes.SORT:
            sortItems(state.tweets, action.sortBy, action.sortOrder);
            return { ...state, sort_by: action.sortBy, sort_order: action.sortOrder }
        case actionTypes.LOAD_TWEETS_FAILURE:
            return {
                ...state,
                error: action.error,
                tweets_loading: false
            }
        default:
            return state
    }
}

export default tweetsReducer;