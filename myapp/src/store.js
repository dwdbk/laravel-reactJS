import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
// import createHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';
import rootReducer from 'reducers';
import rootSaga from 'sagas';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger'

// export const history = createHistory();
export const history = createHashHistory({
    hashType: "slash" // the default
});
const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
    // ...options
    level : 'error'
});

const initialState = {};
const enhancers = [];
const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    // loggerMiddleware
];

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export default store;