import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import configuration from './configuration';
import reducer from './Store/Reducers/index';
import App from './App';

import './index.css';

import * as serviceWorker from './serviceWorker';

const middleware = applyMiddleware(thunk, promise());
const store = createStore(reducer, middleware);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

localStorage.setItem('hostAPI', configuration.apiGateway.URL);

ReactDOM.render(
    app,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
