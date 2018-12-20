import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import * as actionCreators from './Store/Actions/index'

import SignIn from './SignIn/SignIn';
import Register from './Register/Register'
import Notes from './Notes/Notes'

import NotFound from './Common/NotFound'


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes = (
            <Switch>
               <Route exact path="/" component={SignIn}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/register" component={Register}/>
                <Route component={NotFound}/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route exact path="/" component={Notes}/>
                    <Route exact path="/signin" component={Notes}/>
                    <Route exact path="/register" component={Notes}/>
                    <Route component={NotFound}/>
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
