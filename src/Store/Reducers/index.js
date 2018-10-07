import {combineReducers} from 'redux';
import signIn from './SignIn';
import notes from './Notes'

export default combineReducers({
    signIn,
    notes
});
