import React from "react";
import {Redirect, Route} from 'react-router-dom';

const AuthRoute = (props) => {
    return props.authenticated
        ? <Route {...props}/>
        : <Redirect to='/signin'/>
}

export default AuthRoute