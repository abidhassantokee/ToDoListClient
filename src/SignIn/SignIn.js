import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/Actions/index'
import Form from './Form';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        snackbar: {
            status: false,
            message: ''
        },
        blockUI: false
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({blockUI: true});
        this.props.dispatch(actionCreators.signIn(this.state.email, this.state.password, this));
    };

    handleSnackbarClose = () => {
        this.setState({snackbar: {...this.state.snackbar, status: false}})
    };

    render() {
        return (
            <Form
                signInState={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleSnackbarClose={this.handleSnackbarClose}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        signInStore: state.signIn
    };
};

export default connect(mapStateToProps)(SignIn);
