import * as actions from '../actions/action-types';

const initialState = {
    isAuthenticated: localStorage.getItem('token')
        ? true
        : false,
    userId: localStorage.getItem('uid') || null,
    idToken: localStorage.getItem('token') || null,
    loading: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.AUTH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actions.AUTH_USER:
            const {userId, idToken} = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                userId,
                idToken
            };
        case actions.AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                userId: null,
                idToken: null,
                error: action.payload
            };
        case actions.SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
                idToken: null,
                error: null
            };

        default:
            return state;
    }
}
