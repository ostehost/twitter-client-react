import configureStore from 'redux-mock-store';

// Actions to be tested
import * as tweetsActions from '../../actions/tweetsActions';
import actionTypes from '../../actions/actionTypes';

const mockStore = configureStore();
const store = mockStore();


describe('tweetsActions', () => {
    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
    });

    describe('searchChange', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.searchChange("value"));
            expect(store.getActions()).toMatchSnapshot();

            // const expectedActions = [
            //     {
            //         'value': "value",
            //         'type': actionTypes.CHANGE_SEARCH,
            //     },
            // ];

            // store.dispatch(tweetsActions.searchChange("value"));
            // expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('typeChange', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.typeChange("value"));
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe('countChange', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.countChange("value"));
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe('loadTweets', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.loadTweets());
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe('tweetsLoaded', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.tweetsLoaded("value", true));
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe('sort', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.sort('created_at', -1));
            expect(store.getActions()).toMatchSnapshot();
        });
    });

    describe('loadTweetsFailure', () => {
        test('Dispatches the correct action and payload', () => {
            store.dispatch(tweetsActions.loadTweetsFailure('error'));
            expect(store.getActions()).toMatchSnapshot();
        });
    });
});