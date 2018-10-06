import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/Actions/index'
import AppBar from '../Common/AppBar'
import {withRouter} from "react-router-dom";

class Notes extends Component {
    render() {
        return (
            <React.Fragment>
                <AppBar signOut={this.props.onSignOut}/>
                To-Do List Area
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignOut: () => dispatch(actionCreators.signOut())
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Notes));
