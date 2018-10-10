import {TYPES_RESPONSES} from "../../config/responses";
import {CONSTANT_AUTHENTICATE} from '../../constants/index';

const initialState = {
    auth: {},
    signinStatus: null,
    logoutStatus: null,
    error: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
        // login
        case CONSTANT_AUTHENTICATE.SIGNIN_REQUESTED:
            return {
                ...state,
                signinStatus: TYPES_RESPONSES.REQUESTED
            };
        case CONSTANT_AUTHENTICATE.SIGNIN_SUCCEEDED:
            return {
                ...state,
                signinStatus: TYPES_RESPONSES.SUCCESS,
                auth: action.response
            };
        case CONSTANT_AUTHENTICATE.SIGNIN_FAILED:
            return {
                ...state,
                signinStatus: TYPES_RESPONSES.ERROR,
                error: action.response
            };
        // logout
        case CONSTANT_AUTHENTICATE.LOGOUT_REQUESTED:
            return {
                ...state,
                logoutStatus: TYPES_RESPONSES.REQUESTED
            };
        case CONSTANT_AUTHENTICATE.LOGOUT_SUCCEEDED:
            return {
                ...state,
                logoutStatus: TYPES_RESPONSES.SUCCESS,
            };
        case CONSTANT_AUTHENTICATE.LOGOUT_FAILED:
            return {
                ...state,
                logoutStatus: TYPES_RESPONSES.ERROR,
                error: action.response
            };
        default:
            return state;
    }
};