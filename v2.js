//#region IMPORT
const {
    applyMiddleware, bindActionCreators,
    combineReducers, compose, createStore
} = require('redux');
const {
    actionChannel, all, apply, call, cancel, cancelled, cps, debounce,
    delay, flush, fork, join, put, putResolve, race, retry, select, spawn,
    take, takeEvery, takeLatest, takeLeading, takeMaybe, throttle
} = require('redux-saga/effects');
const createSagaMiddleware = require('redux-saga').default;
//#endregion

//#region REDUX
const sagaMiddleware = createSagaMiddleware();
const store = createStore(counter, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync);
const action = type => store.dispatch({ type });


// reducers
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

// action
console.group('aksiyonlar');
console.log(store.getState());
action('INCREMENT');
console.log(store.getState());
action('DECREMENT');
console.log(store.getState());
action('INCREMENT_ASYNC');
setTimeout(() => console.log('timeout', store.getState()), 1001);
console.groupEnd('aksiyonlar');
//#endregion

//#region SAGA
function* incrementAsync() {
    yield delay (1000);
    yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

module.exports = { incrementAsync };

//#endregion