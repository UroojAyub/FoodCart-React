import {combineReducers} from 'redux';
import ShopReducer from './shop-reducer';
import AuthReducer from './auth-reducer';
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({shop: ShopReducer, auth: AuthReducer, form: formReducer});

export default rootReducer;
