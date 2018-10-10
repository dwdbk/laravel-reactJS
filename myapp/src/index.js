import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from './store';
import frFR from 'antd/lib/locale-provider/fr_FR';
import {message} from 'antd';
import './styles/app.scss';
import 'material-design-icons/iconfont/material-icons.css';
import LocaleProvider from "antd/es/locale-provider/index";
import App from "./containers/app";
import Login from "./containers/login";
import Home from "./containers/home";
import {Route, Router, Switch} from "react-router";
import NotFoundPage from "./containers/notFoundPage";

message.config({
    top: 50, //distance from top
    duration: 5, //time before auto-dismiss, in seconds
    maxCount: 1, //max message show, drop oldest if exceed limit
});

const target = document.querySelector('#app');

render(
    <LocaleProvider locale={frFR}>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        </Provider>
    </LocaleProvider>,
    target
);
