import * as actions from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    userId:  localStorage.getItem('uid') ||  null,
    idToken: localStorage.getItem('token') || null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.AUTH_USER:
            const {userId, idToken} = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                userId,
                idToken
            };
        case actions.AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
                idToken: null,
                error: action.payload
            };

        default:
            return state;
    }
}
