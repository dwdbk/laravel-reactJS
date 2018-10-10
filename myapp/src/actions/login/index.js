import {CONSTANT_AUTHENTICATE} from '../../constants/index';
// import CONSTANT_AUTHENTICATE from 'constants';

const requestSignin = (data) => {
    return {
        type: CONSTANT_AUTHENTICATE.SIGNIN_REQUESTED,
        payload: data
    }
};

const getSigninSuccess = (data) => {
    return {type: CONSTANT_AUTHENTICATE.SIGNIN_SUCCEEDED, response: data}
};

const getSigninError = (error) => {
    return {type: CONSTANT_AUTHENTICATE.SIGNIN_FAILED, response: error}
};


const requestLogout = () => {
    return {
        type: CONSTANT_AUTHENTICATE.LOGOUT_REQUESTED
    }
};

const getLogoutSuccess = (data) => {
    return {type: CONSTANT_AUTHENTICATE.LOGOUT_SUCCEEDED, response: data}
};

const getLogoutError = (error) => {
    return {type: CONSTANT_AUTHENTICATE.LOGOUT_FAILED, response: error}
};

export {
    requestSignin,
    getSigninSuccess,
    getSigninError,
    requestLogout,
    getLogoutSuccess,
    getLogoutError,
}
