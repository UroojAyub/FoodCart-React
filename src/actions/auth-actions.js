import * as actions from './action-types';
import {auth} from '../config/firebase';

export const signIn = ({
    email,
    password
}, successCallback) => dispatch => {

    dispatch({type: actions.AUTH_REQUEST, payload: null});
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
                })
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.AUTH_ERROR,
                payload: error.message || 'Sign in failed'
            })
        })
}

export const signUp = ({
    email,
    password
}, successCallback) => dispatch => {

    dispatch({type: actions.AUTH_REQUEST, payload: null});
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
                })
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: actions.AUTH_ERROR,
                payload: error.message || 'Sign up failed'
            })
        })
}

export const signOut = (callback) => dispatch => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    dispatch({type: actions.CLEAR_SHOP_MESSAGES, payload: null});
    dispatch({type: actions.SIGN_OUT, payload: null});
    return auth
        .doSignOut()
        .then(() => {
            callback();
        })
}

export const observeAuthState = () => dispatch => {
    auth.onAuthStateChanged(user => {
        console.log(user);
        if (user) {
            user
                .getIdToken()
                .then(token => {
                    localStorage.setItem('uid', user.uid)
                    localStorage.setItem('token', token)
                    dispatch({
                        type: actions.AUTH_USER,
                        payload: {
                            userId: user.uid,
                            idToken: token
                        }
                    })
                })
        } else {
            dispatch({type: actions.AUTH_ERROR, payload: null})
        }
    }, error => {
        console.log(error);
        dispatch({type: actions.AUTH_ERROR, payload: null})
    });
};