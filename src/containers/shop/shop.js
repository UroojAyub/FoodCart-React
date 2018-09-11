import React, {Component} from 'react'
import OrderBasket from '../../components/order/order-basket/order-basket';
import ItemControls from '../../components/order/item-controls/item-controls';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {compose} from 'redux';
import withLoader from '../../hoc/withLoader/withLoader';
import _ from 'lodash';
import Checkout from '../checkout/checkout';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckout: false
        }
    }

    componentWillUpdate(props, state) {
        console.log(props.cartItems,props.totalPrice)
    }

    showCheckoutForm = () => {
        if (!_.isEmpty(this.props.cartItems) && !this.state.showCheckout) {
            this.setState({showCheckout: true});
        }
    }

    hideCheckoutForm = () => {
        if (this.state.showCheckout) {
            this.setState({showCheckout: false});
        }
    }

    render() {
        return (
                    <div className="row">
                        <div className="col-md-6 flex-column">
                        <OrderBasket
                            orderItems={this.props.cartItems}
                            showCheckout={this.showCheckoutForm}
                            totalPrice={this.props.totalPrice}/>
                        </div>
                    <div className="col-md-6 flex-column">
                        {this.state.showCheckout
                            ? <Checkout onBack={this.hideCheckoutForm}/>
                            : (<ItemControls
                                items={this.props.items}
                                orderItems={this.props.cartItems}
                                onAddItem={this.props.addToCart}
                                onRemoveItem={this.props.removeFromCart}/>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {items: state.shop.itemsList, cartItems: state.shop.cartItems, totalPrice: state.shop.totalPrice}
}

export default compose(connect(mapStateToProps, actions), withLoader)(Shop)