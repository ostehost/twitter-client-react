// Reducer to be tested
import tweetsReducer from '../../reducers/tweetsReducer';
import actionTypes from '../../actions/actionTypes';

describe('tweetsReducer', () => {

    test('is correct', () => {
        const action = { type: null };
        expect(tweetsReducer(undefined, action)).toMatchSnapshot();
    });

    describe('CHANGE_TYPE', () => {
        test('is correct', () => {
            const action = { type: actionTypes.CHANGE_TYPE, value: "test" };
            // const initialState = { search: "test" };
            // expect(tweetsReducer(undefined, action)).toEqual(initialState);
            expect(tweetsReducer(undefined, action)).toMatchSnapshot();
        });
    });

    describe('CHANGE_COUNT', () => {
        test('is correct', () => {
            const action = { type: actionTypes.CHANGE_COUNT, value: "test" };
            expect(tweetsReducer(undefined, action)).toMatchSnapshot();
        });
    });

    describe('CHANGE_SEARCH', () => {
        test('is correct', () => {
            const action = { type: actionTypes.CHANGE_SEARCH, value: "test" };
            expect(tweetsReducer(undefined, action)).toMatchSnapshot();
        });
    });

    describe('LOAD_TWEETS', () => {
        test('is correct', () => {
            const action = { type: actionTypes.LOAD_TWEETS };
            expect(tweetsReducer(undefined, action)).toMatchSnapshot();
        });
    });

    describe('TWEETS_LOADED, ', () => {
        test('is correct', () => {
            const action = { type: actionTypes.TWEETS_LOADED, payload: "payload", append: true};
            expect(tweetsReducer({tweets: []}, action)).toMatchSnapshot();
        });
    });

    describe('SORT, ', () => {
        test('is correct', () => {
            const action = { type: actionTypes.SORT, sortBy: "created_at", sortOrder: 1 };
            expect(tweetsReducer({tweets: []}, action)).toMatchSnapshot();
        });
        test('is correct', () => {
            const action = { type: actionTypes.SORT, sortBy: "created_at", sortOrder: -1 };
            expect(tweetsReducer({tweets: []}, action)).toMatchSnapshot();
        });
    });

    describe('LOAD_TWEETS_FAILURE, ', () => {
        test('is correct', () => {
            const action = { type: actionTypes.LOAD_TWEETS_FAILURE, error: "error" };
            expect(tweetsReducer(undefined, action)).toMatchSnapshot();
        });
    });
});