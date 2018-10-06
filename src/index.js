import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './Store/Reducers/index';

import './index.css';
import App from './App';

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

localStorage.setItem('hostAPI', 'http://localhost:8000/api');

ReactDOM.render(
    app,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
