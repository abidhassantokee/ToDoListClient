import * as actionTypes from './ActionTypes';
import axios from "axios";

export const getToDOList = (component) => {
    return dispatch => {
        component.setState({blockUI: true});
        axios.get(localStorage.getItem('hostAPI') + '/notes').then(response => {
            dispatch({
                type: actionTypes.SET_NOTES,
                payload: {
                    notes: response.data.notes
                }
            });
            component.setState({blockUI: false});
        }).catch((error) => {
            component.setState({
                snackbar: {
                    status: true,
                    message: error.response.data.message
                },
                blockUI: false
            });
        });
    }
};

export const addToDoItem = (note, component) => {
    return dispatch => {
        axios.post(localStorage.getItem('hostAPI') + '/notes/create', {
            note: note,
        }).then(response => {
            dispatch({
                type: actionTypes.ADD_NOTE,
                payload: {
                    note: response.data.note
                }
            });
            component.setState({
                note: '',
                snackbar: {
                    status: true,
                    message: response.data.message
                },
                blockUI: false
            });
        }).catch((error) => {
            component.setState({
                snackbar: {
                    status: true,
                    message: error.response.data.message
                },
                blockUI: false
            });
        });
    }
};

export const deleteToDoItem = (noteId, index, component) => {
    return dispatch => {
        component.setState({blockUI: true});
        axios.delete(localStorage.getItem('hostAPI') + '/notes/delete/' + noteId).then(response => {
            dispatch({
                type: actionTypes.DELETE_NOTE,
                payload: {
                    index: index
                }
            });
            component.setState({blockUI: false});
        }).catch((error) => {
            component.setState({
                snackbar: {
                    status: true,
                    message: error.response.data.message
                },
                blockUI: false
            });
        });
    }
};