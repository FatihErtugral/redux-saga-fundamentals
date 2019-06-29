const test = require('tape');
const { call, put } = require('redux-saga/effects');
const { request } = require('http');
const { fetchData, fetchDataApi } = require('./v3');

test('fetchData Saga test', (assert) => {
    let gen = fetchData();

    assert.deepEqual(
        gen.next().value,
        call(fetchDataApi, 'https://www.google.com/search?q=fatih+ertugral'),
        "fetchData should yield an Effect call(fetchDataApi, './url')"
    );
    
    assert.deepEqual(
        gen.next({ error: 'test' }).value,
        put({ type: 'DATA_REQUEST_FAILED', error: 'test' }),
        'fetchData Saga must dispatch an DATA_REQUEST_FAILED action'
    );

    gen = fetchData();
    gen.next();
    assert.deepEqual(
        gen.next({ response: 'response' }).value,
        put({ type: 'DATA_RECEIVED', data: 'response' }),
        'fetchData Saga must dispatch an DATA_RECEIVED action'
    );

    assert.end()
});