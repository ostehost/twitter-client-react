import actionTypes from './actionTypes';

export const searchChange = (value) => (
    { type: actionTypes.CHANGE_SEARCH, value: value }
)

export const typeChange = (value) => (
    { type: actionTypes.CHANGE_TYPE, value: value }
)

export const countChange = (value) => (
    { type: actionTypes.CHANGE_COUNT, value: value }
)

export const loadTweets = () => (
    { type: actionTypes.LOAD_TWEETS }
)

export const tweetsLoaded = (payload, append) => (
    { type: actionTypes.TWEETS_LOADED, payload, append }
)

export const sort = (sortBy, sortOrder) => (
    { type: actionTypes.SORT, sortBy, sortOrder }
)

export const loadTweetsFailure = (error) => {
    return { type: actionTypes.LOAD_TWEETS_FAILURE, error }
}