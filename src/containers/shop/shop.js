import React, {Component} from 'react'
import OrderBasket from '../../components/order/order-basket/order-basket';
import ItemControls from '../../components/order/item-controls/item-controls';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {compose} from 'redux';
import withLoader from '../../hoc/withLoader/withLoader';
import _ from 'lodash';
import Checkout from '../checkout/checkout';
import Loader from '../../components/ui/loader/loader';
import Alert from '../../components/ui/alert/alert';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckout: false
        }
    }

    componentDidMount(){
        this.props.clearSuccessError();
    }

    componentWillUpdate(props, state) {
        console.log(props.cartItems, props.totalPrice)
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
            <div>
                <Loader show={this.props.loading}/>
                <Alert
                    show={this.props.showAlert}
                    type={this.props.alertType}
                    message={this.props.alertMessage}
                    onClose={this.props.clearSuccessError}/>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.shop.itemsList,
        cartItems: state.shop.cartItems,
        totalPrice: state.shop.totalPrice,
        loading: state.shop.loading,
        showAlert: state.shop.error || state.shop.success
            ? true
            : false,
        alertType: state.shop.error
            ? 'alert-danger'
            : state.shop.success
                ? 'alert-success'
                : '',
        alertMessage: state.shop.error
            ? state.shop.error
            : state.shop.success
                ? state.shop.success
                : ''
    }
}

export default compose(connect(mapStateToProps, actions), withLoader)(Shop)