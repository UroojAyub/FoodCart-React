import * as actions from '../actions/action-types';
import _ from 'lodash';

const initialState = {
    itemsList: {
        burger: {
            name: 'Chicken Burger',
            price: 2.4
        },
        pizza: {
            name: 'Pepperoni Pizza',
            price: 1.1
        },
        fries: {
            name: 'Crispy Fries',
            price: 0.5
        }
    },
    cartItems: null,
    totalPrice: 0
}

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.ADD_CART_ITEM:
            return addItemToCart(state, action);
        case actions.REMOVE_CART_ITEM:
            return removeItemFromCart(state, action);
        default:
            return state;
    }
}

const addItemToCart = (state, action) => {

    const itemKey = action.payload.item;
    const cartItems = {
        ...state.cartItems
    }

    if (cartItems[itemKey]) {
        // If item exists in cart then increment count
        const updatedCount = cartItems[itemKey].count + 1;
        return {
            ...state,
            cartItems: {
                ...state.cartItems,
                [itemKey]: {
                    ...state.cartItems[itemKey],
                    count: updatedCount
                }
            },
            totalPrice: Math.round((state.totalPrice + cartItems[itemKey].price) * 100) / 100
        };
    } else {
        // if item doesnt exist in cart then add with count 1
        const newCartItem = {
            ...state.itemsList[itemKey],
            count: 1
        };
        return {
            ...state,
            cartItems: {
                ...state.cartItems,
                [itemKey]: newCartItem
            },
            totalPrice: Math.round((state.totalPrice + newCartItem.price) * 100) / 100
        };
    }
}

const removeItemFromCart = (state, action) => {
    const itemKey = action.payload.item;
    const cartItems = {
        ...state.cartItems
    }
    if (cartItems[itemKey]) {
        const updatedCount = cartItems[itemKey].count - 1 >= 0
            ? cartItems[itemKey].count - 1
            : 0;
        if (updatedCount === 0) {
            return {
                ...state,
                cartItems: {
                    ..._.omit(state.cartItems, itemKey)
                },
                totalPrice:Math.round((state.totalPrice - cartItems[itemKey].price) * 100) / 100
            };
        } else {
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [itemKey]: {
                        ...state.cartItems[itemKey],
                        count: updatedCount
                    },
                },
                totalPrice:Math.round((state.totalPrice - cartItems[itemKey].price) * 100) / 100

            };
        }
    }
    else {
        return state;
    }
}