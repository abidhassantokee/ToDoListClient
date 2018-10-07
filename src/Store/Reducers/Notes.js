import * as actionTypes from '../Actions/ActionTypes'

export default function reducer(state = {
    notes: [],
}, action) {
    switch (action.type) {
        case actionTypes.SET_NOTES: {
            return {
                ...state,
                notes: [...action.payload.notes]
            }
        }
        case actionTypes.ADD_NOTE: {
            return {
                ...state,
                notes: [...state.notes, action.payload.note]
            }
        }
        case actionTypes.DELETE_NOTE: {
            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, action.payload.index),
                    ...state.notes.slice(action.payload.index + 1, state.notes.length)
                ]
            }
        }
        default: {
            return state;
        }
    }
}
