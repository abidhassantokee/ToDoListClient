import * as actionTypes from '../Actions/ActionTypes'

export default function reducer(state = {
    jwtToken: null,
    jwtExpires: null
}, action) {
    switch (action.type) {
        case actionTypes.SET_JWT: {
            return {
                ...state,
                jwtToken: action.payload.jwtToken,
                jwtExpires: action.payload.jwtExpires
            }
        }
        case actionTypes.UNSET_JWT: {
            return {
                ...state,
                jwtToken: null,
                jwtExpires: null
            }
        }
        default: {
            return state;
        }
    }
}
