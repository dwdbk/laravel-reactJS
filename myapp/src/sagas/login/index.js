import {put, call, takeLatest} from 'redux-saga/effects'
import * as loginActions from '../../actions/login';
import * as api from '../../api/login';
import {CONSTANT_AUTHENTICATE} from '../../constants/index';
import {TYPES_RESPONSES} from '../../config/responses';

export default function* watchSignin() {
    yield takeLatest(CONSTANT_AUTHENTICATE.SIGNIN_REQUESTED, signinAsync);
    yield takeLatest(CONSTANT_AUTHENTICATE.LOGOUT_REQUESTED, logout);
}

export function* signinAsync(action) {
    try {
        const response = yield call(() => {
            return api.signin(action);
        });

        if (response.status === TYPES_RESPONSES.SUCCESS) {
            yield put(loginActions.getSigninSuccess(response.data));
        } else {
            yield put(loginActions.getSigninError(response));
        }
    } catch (error) {
        yield put(loginActions.getSigninError(error));
    }
}

export function* logout(action) {
    try {
        const response = yield call(() => {
            return api.logout(action);
        });

        if (response.status === TYPES_RESPONSES.SUCCESS) {
            yield put(loginActions.getLogoutSuccess(response.data));
        } else {
            yield put(loginActions.getLogoutError(response));
        }
    } catch (error) {
        yield put(loginActions.getLogoutError(error));
    }
}