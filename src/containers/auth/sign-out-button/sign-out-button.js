import React, {Component} from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../actions/index';

class SignOutButton extends Component {

    render() {
        return (
            <button
                className="btn btn-warning"
                onClick={() => {
                this
                    .props
                    .signOut(this.redirectLogin)
            }}>Sign Out</button>
        )
    }

    redirectLogin = () => {
        this
            .props
            .history
            .push('/signin');
    }
}

export default withRouter(connect(null, actions)(SignOutButton));