import {auth} from './firebase';

// Auth Listener
export const onAuthStateChanged = (observer, error) => auth.onIdTokenChanged(observer, error)
// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();
