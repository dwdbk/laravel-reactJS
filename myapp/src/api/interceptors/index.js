import axios from 'axios';
import {message} from "antd/lib/index";
import {logout} from "../../localstorage/local_storage";
import i18n from "../../i18n";
import {history} from "../../store";


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("config request ", config);
    return config;
}, function (error) {
    // Do something with request error
    // console.log("error request ", error);
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log("response ", response);
    return response;
}, function (error) {
    // Do something with response error
    const {config, response: {status}} = error;
    const originalRequest = config;
    // console.log("status response ", status);
    // console.log("config response ", config);
    if (status === 401 && config.config.url.indexOf("login") === -1) {
        message.error(i18n.t("authentication.forbidden"));
    } else if (status === 504) {
        message.error(i18n.t("authentication.forbidden"));
    } else if (status === 403) {
        if (logout()) {
            history.push('/login');
            message.success(i18n.t("authentication.disconnect"));
        }
    }
    return Promise.reject(error);
});

export default class Interceptors {

}
