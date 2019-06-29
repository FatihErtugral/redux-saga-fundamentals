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
const store = createStore(()=>({}), applyMiddleware(sagaMiddleware));
sagaMiddleware.run(helloSaga);
const action = type => store.dispatch({ type });
//#endregion

//#region SAGA

function* helloSaga() {
    console.log('Hello Sagas!');
}
//#endregion