import * as actionTypes from './ActionTypes';
import axios from 'axios';

export const checkTokenTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signOut());
        }, expiresIn)
    }
};

export const checkTokenState = () => {
    return dispatch => {
        const jwtToken = localStorage.getItem('jwtToken');
        const jwtExpires = new Date(localStorage.getItem('jwtExpires'));
        if (jwtToken === null || jwtExpires <= new Date()) {
            dispatch(signOut());
        } else {
            dispatch(signInSuccess(jwtToken, localStorage.getItem('jwtExpires')));
            dispatch(checkTokenTimeout((jwtExpires.getTime() - new Date().getTime())));
        }
    }
};

export const signIn = (email, password, component) => {
    return dispatch => {
        axios.post(localStorage.getItem('hostAPI') + '/auth/login', {
            email: email,
            password: password,
        }).then(response => {
            dispatch(signInSuccess(response.data.access_token, response.data.expires_in * 1000));
            localStorage.setItem('jwtToken', response.data.access_token);
            localStorage.setItem('jwtExpires', new Date(new Date().getTime() + response.data.expires_in * 1000));
            dispatch(checkTokenTimeout(response.data.expires_in * 1000));
            component.props.history.push('/');
        }).catch((error) => {
            component.setState({
                snackbar: {
                    status: true,
                    message: error.response.data.error
                },
                blockUI: false
            });
        });
    }
};

export const signInSuccess = (jwtToken, jwtExpires) => {
    return {
        type: actionTypes.SET_JWT,
        payload: {
            jwtToken: jwtToken,
            jwtExpires: jwtExpires
        }
    };
};

export const signOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtExpires');
    return {
        type: actionTypes.UNSET_JWT
    };
};
