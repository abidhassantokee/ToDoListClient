import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actionCreators from '../Store/Actions/index';
import AppBar from '../Common/AppBar';
import ToDoList from './ToDoList';
import axios from "axios";

class Notes extends Component {
    state = {
        note: '',
        snackbar: {
            status: false,
            message: ''
        },
        blockUI: false
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + this.props.signInStore.jwtToken;
        this.props.dispatch(actionCreators.getToDOList(this));
    }

    handleNoteFieldChange = (input) => {
        this.setState({note: input});
    };

    handleNoteSubmit = () => {
        this.setState({blockUI: true});
        this.props.dispatch(actionCreators.addToDoItem(this.state.note, this));
    };

    deleteToDoItem = (noteId, index) => {
        this.props.dispatch(actionCreators.deleteToDoItem(noteId, index, this));
    };

    handleSnackbarClose = () => {
        this.setState({snackbar: {...this.state.snackbar, status: false}})
    };

    handleSignOut = () => {
        this.props.dispatch(actionCreators.signOut());
    };

    render() {
        return (
            <React.Fragment>
                <AppBar signOut={this.handleSignOut}/>
                <ToDoList
                    toDoStore={this.props.toDoStore}
                    toDoState={this.state}
                    handleNoteFieldChange={this.handleNoteFieldChange}
                    handleNoteSubmit={this.handleNoteSubmit}
                    deleteToDoItem={this.deleteToDoItem}
                    handleSnackbarClose={this.handleSnackbarClose}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        toDoStore: state.notes,
        signInStore: state.signIn
    };
};

export default withRouter(connect(mapStateToProps)(Notes));
