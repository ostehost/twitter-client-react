
import { mapTo, map, delay, tap, mergeMap, takeUntil, takeWhile, catchError } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { webSocket } from 'rxjs/webSocket' // for RxJS 6, for v5 use Observable.webSocket

import { tweetsLoaded, loadTweetsFailure } from '../actions/tweetsActions';

import actionTypes from '../actions/actionTypes';

import { ofType } from 'redux-observable';
import { of } from 'rxjs';

const tweetsEpic = (action$, state$) => action$.pipe(
    ofType(actionTypes.LOAD_TWEETS),
    mergeMap(action => {

        let source;

        if (state$.value.tweetsReducer.type === 'real_time') {
            source = webSocket(`ws://localhost:8999?track=${state$.value.tweetsReducer.search}`);
        } else {
            source = ajax.getJSON(`http://localhost:8000/api/tweets?search=${state$.value.tweetsReducer.search}&count=${state$.value.tweetsReducer.count}&result_type=${state$.value.tweetsReducer.type}`);
        }

        return source.pipe(
            takeUntil(action$.pipe(
                ofType('LOAD_TWEETS')
            )),
            takeWhile(
                () => state$.value.tweetsReducer.tweets.length < state$.value.tweetsReducer.count
            ),
            map(response => {
                return tweetsLoaded(response, state$.value.tweetsReducer.type === 'real_time');
            }),
            catchError(error => of(
                loadTweetsFailure('Connection Error')
            ))
        );
    })
);

export default tweetsEpic;

