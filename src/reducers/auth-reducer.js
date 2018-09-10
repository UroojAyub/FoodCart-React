import * as actions from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    isAuthenticated:false,
    userId: null,
    idToken: null,
    error:null
}

export default function (state = initialState, action) {
    switch (action.type) {

     
        default:
            return state;
    }
}
