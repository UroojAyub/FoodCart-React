import * as actions from './action-types';
import {auth} from '../config/firebase';

export const signIn = ({
    email,
    password
}, successCallback, errorCallback) => dispatch => {
    return auth
        .doSignInWithEmailAndPassword(email, password)
        .then(data => {
            data
                .user
                .getIdToken()
                .then(token => {
                    localStorage.setItem('uid', data.user.uid)
                    localStorage.setItem('token', token)
                    dispatch({
                        type: actions.AUTH_USER,
                        payload: {
                            userId: data.user.uid,
                            idToken: token
                        }
                    })
                    successCallback();
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: actions.AUTH_ERROR,
                        payload: error.message || 'Sign in failed'
                    })
                    errorCallback();
                })
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.AUTH_ERROR,
                payload: error.message || 'Sign in failed'
            })
            errorCallback();
        })
}

export const signUp = ({
    email,
    password
}, successCallback, errorCallback) => dispatch => {
    return auth
        .doCreateUserWithEmailAndPassword(email, password)
        .then(data => {
            data
                .user
                .getIdToken()
                .then(token => {
                    localStorage.setItem('uid', data.user.uid)
                    localStorage.setItem('token', token)
                    dispatch({
                        type: actions.AUTH_USER,
                        payload: {
                            userId: data.user.uid,
                            idToken: token
                        }
                    })
                    successCallback();
                })
                .catch(error => {
                    console.log(error);
                    dispatch({
                        type: actions.AUTH_ERROR,
                        payload: error.message || 'Sign up failed'
                    })
                    errorCallback();
                })
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.AUTH_ERROR,
                payload: error.message || 'Sign up failed'
            })
            errorCallback();
        })
}

export const signOut = (callback) => dispatch => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    dispatch({type: actions.SIGN_OUT, payload: null})
    return auth
        .doSignOut()
        .then(() => {
            callback();
        })
}
