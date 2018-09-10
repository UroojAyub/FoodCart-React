import React from "react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {

    class Authentication extends React.Component {
        render() {
            return this.props.authenticated
                ? <WrappedComponent {...this.props}/>
                : <Redirect to='/signin'/>
        }
    }
    const mapStateToProps = (state) => {
        return {authenticated: state.auth.isAuthenticated};
    }

    return connect(mapStateToProps)(Authentication);
}

export default withAuthentication;

