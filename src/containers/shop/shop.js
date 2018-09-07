import React, {Component} from 'react'
import OrderBasket from '../../components/order/order-basket/order-basket';
import ItemControls from '../../components/order/item-controls/item-controls';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/index';

class Shop extends Component {


    componentWillUpdate(props, state) {
        console.log(props.cartItems,props.totalPrice)
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 flex-column">
                            <OrderBasket orderItems={this.props.cartItems}/>
                        </div>
                        <div className="col-md-6  flex-column">
                            <ItemControls
                                items={this.props.items}
                                orderItems={this.props.cartItems}
                                onAddItem={this.props.onAddItem}
                                onRemoveItem={this.props.onRemoveItem}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {items: state.shop.itemsList, cartItems: state.shop.cartItems,totalPrice:state.shop.totalPrice}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItem: item => (dispatch(actionCreators.addToCart(item))),
        onRemoveItem: item => (dispatch(actionCreators.removeFromCart(item)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)