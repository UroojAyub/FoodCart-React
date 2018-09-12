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
    totalPrice: 0,
    userOrders: null,
    loading: false,
    success: null,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.ADD_CART_ITEM:
            return addItemToCart(state, action);
        case actions.REMOVE_CART_ITEM:
            return removeItemFromCart(state, action);
        case actions.REQUEST_LOAD:
            return requestLoading(state, action);
        case actions.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actions.FETCH_ORDERS_ERROR:
            return fetchOrdersError(state, action);
        case actions.NEW_ORDER_SUCCESS:
            return newUserOrderSuccess(state, action);
        case actions.NEW_ORDER_ERROR:
            return newUserOrderError(state, action);
        case actions.DELETE_ORDER_SUCCESS:
            return deleteUserOrderSuccess(state, action);
        case actions.DELETE_ORDER_ERROR:
            return deleteUserOrderError(state, action);
        case actions.RESET_CART:
            return resetCart(state, action);
        case actions.CLEAR_SHOP_MESSAGES:
            return {
                ...state,
                success: null,
                error: null
            };
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
                totalPrice: Math.round((state.totalPrice - cartItems[itemKey].price) * 100) / 100
            };
        } else {
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [itemKey]: {
                        ...state.cartItems[itemKey],
                        count: updatedCount
                    }
                },
                totalPrice: Math.round((state.totalPrice - cartItems[itemKey].price) * 100) / 100

            };
        }
    } else {
        return state;
    }
}

const newUserOrderSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        success: 'Order has been added successfully!',
        userOrders: {
            ...state.userOrders,
            ...action.payload
        }
    };
}

const newUserOrderError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.payload
    }
}

const resetCart = (state, action) => {
    return {
        ...state,
        cartItems: null,
        totalPrice: 0
    }
}

const requestLoading = (state, action) => {
    return {
        ...state,
        loading: true,
        success: null,
        error: null
    }
}

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        userOrders: action.payload,
        error: null
    }
}

const fetchOrdersError = (state, action) => {
    return {
        ...state,
        loading: false,
        userOrders: {},
        error: action.payload
    };
}

const deleteUserOrderSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        userOrders: _.omit(state.userOrders, action.payload),
        success: 'Order deleted successfully',
        error: null
    }
}

const deleteUserOrderError = (state, action) => {
    return {
        ...state,
        loading: false,
        success: null,
        error: 'Order could not be deleted'
    }
}