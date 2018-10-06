import React, {Component} from 'react';
import axios from 'axios';

import Form from './Form';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
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
        axios.post(localStorage.getItem('hostAPI') + '/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation
        }).then(response => {
            this.setState({
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                snackbar: {
                    status: true,
                    message: response.data.message
                },
                blockUI: false
            });
            setTimeout(() => this.props.history.push('signin'), 3000);
        }).catch((error) => {
            this.setState({
                snackbar: {
                    status: true,
                    message: error.response.data.errors[Object.keys(error.response.data.errors)[0]]
                },
                blockUI: false
            })
        });
    };

    handleSnackbarClose = () => {
        this.setState({snackbar: {...this.state.snackbar, status: false}})
    };

    render() {
        return (
            <Form
                registerState={this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleSnackbarClose={this.handleSnackbarClose}
            />
        );
    }
}

export default Register;
