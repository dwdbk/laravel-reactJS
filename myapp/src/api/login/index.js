import axios from 'axios';
import Environment from '../../environment'
import {TYPES_RESPONSES} from "../../config/responses";

const API_ENDPOINT = 'login';
const options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    }
};

// created sigin api function

export const signin = (action) => {

    let formData = new FormData();
    formData.append('username', action.payload.data.login);
    formData.append('password', action.payload.data.password);

    return axios({
        method: 'POST',
        url: Environment.SERVER_URL + API_ENDPOINT,
        data: formData,
        config: options
    })
        .then(function (response) {
            //handle success
            console.log("handle signin success ", response);
            return {
                data: response.data,
                status: TYPES_RESPONSES.SUCCESS,
                codeStatus: response.status
            };
        })
        .catch(function (response) {
            //handle error
            console.log("handle signin error ", response);
            return {
                error: response.response.data,
                status: TYPES_RESPONSES.ERROR,
                codeStatus: response.response.status
            };
        });
};

export const logout = (action) => {
    return axios({
        method: 'GET',
        url: Environment.SERVER_URL + "logout",
        config: options
    })
        .then(function (response) {
            //handle success
            console.log("handle logout success ", response);
            return {
                data: response.data,
                status: TYPES_RESPONSES.SUCCESS,
                codeStatus: response.status
            };
        })
        .catch(function (error) {
            //handle error
            console.log("handle logout error ", error);
            return {
                error: error.response.data,
                status: TYPES_RESPONSES.ERROR,
                codeStatus: error.response.status
            };
        });
};

