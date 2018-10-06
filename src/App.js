import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import * as actionCreators from './Store/Actions/index'

import SignIn from './SignIn/SignIn';
import Register from './Register/Register'
import Notes from './Notes/Notes'


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <Switch>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/register" component={Register}/>
                <Redirect to="/signin"/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route exact path="/" component={Notes}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <div>
                {routes}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.signIn.jwtToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actionCreators.checkTokenState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
