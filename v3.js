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
const fetch = require('node-fetch');
//#endregion

//#region REDUX
const sagaMiddleware = createSagaMiddleware();
const store = createStore(counter, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(fetchData);
const action = type => store.dispatch({ type });


// reducers
function counter(state = { data: '', error: '' }, action) {
    switch (action.type) {
        case 'DATA_RECEIVED':
            return Object.assign({}, state, { data: action.data });
        case 'DATA REQUEST_FAILED':
            return Object.assign({}, state, { error: action.error });
        default:
            return state
    }
}
//#endregion

//#region GET API
function fetchDataApi(URL) {
    return fetch(URL)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}
//#endregion

//#region SAGA
function* fetchData() {
    const { response, error } = yield call(fetchDataApi, 'https://www.google.com/search?q=fatih+ertugral');
    response
        ? yield put({ type: 'DATA_RECEIVED', data: response })
        : yield put({ type: 'DATA_REQUEST_FAILED', error });
}
//#endregion

//#region CONSOLE RESULT
// console.log('sync data', store.getState());
// setTimeout(() => console.log('timeout async data', store.getState()), 1001);
//#endregion

module.exports = {
    fetchData,
    fetchDataApi,
}

