import {combineReducers} from 'redux';
import ShopReducer from './shop-reducer';

const rootReducer = combineReducers({shop: ShopReducer});

export default rootReducer;
