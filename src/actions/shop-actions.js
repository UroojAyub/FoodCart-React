import * as actions from './action-types';
import {orderFB} from '../config/firebase';

export const addToCart = (item) => {
    return {type: actions.ADD_CART_ITEM, payload: {
            item
        }}
}

export const removeFromCart = (item) => {
    return {type: actions.REMOVE_CART_ITEM, payload: {
            item
        }}
}

export const createNewOrder = (userId, order,) => (dispatch) => {

    dispatch({type: actions.NEW_ORDER_REQUEST, payload: null});

    return orderFB
        .pushNewOrder(userId, order)
        .then((data) => {
            console.log(data);
            dispatch({
                type: actions.NEW_ORDER_SUCCESS,
                payload: {
                    [data.$key]: order
                }
            });
            dispatch({type: actions.RESET_CART, payload: null});
        })
        .catch(error => {
            dispatch({type: actions.NEW_ORDER_ERROR, payload: 'Order could not be placed! Please try again'});
            console.log(error);
        })
}

export const clearSuccessError = () => dispatch => {
    return dispatch({type: actions.CLEAR_SHOP_MESSAGES, payload: null})
}