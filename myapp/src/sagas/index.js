import {all} from 'redux-saga/effects';
import watchSignin from './login';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchSignin(),
    ])
}