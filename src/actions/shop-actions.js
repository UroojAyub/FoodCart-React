import * as actions from './action-types';

export const addToCart = (item) => {
    return {
        type: actions.ADD_CART_ITEM, 
        payload: {
            item
        }
    }
}

export const removeFromCart = (item) => {
    return {
        type: actions.REMOVE_CART_ITEM, 
        payload: {
            item
        }
    }
}