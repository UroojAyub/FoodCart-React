import React, {Component} from 'react'
import {CHECKOUT_FIELDS} from './checkout-constants';
import FormInput from '../../components/ui/form-input/form-input';
import _ from 'lodash';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import * as actions from '../../actions/index';

class Checkout extends Component {

    renderFields() {
        return (
            <div>
                {_.map(CHECKOUT_FIELDS, (config, title) => {
                    return (<FormInput {...config} title={title} key={title}/>);
                })}
            </div>
        )
    }

    onSubmit = (values) => {
        const order = {
            items: this.props.orderItems,
            totalPrice: this.props.totalPrice,
            timestamp: Math.round(new Date().getTime()),
            userInfo: {
                name: values.name,
                email: values.email,
                address: values.address,
                deliveryMethod: values.deliveryMethod
            }
        }
        this
            .props
            .createNewOrder(this.props.userId, order)
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="card h-100">
                <div className="card-header bg-dark text-light d-flex justify-content-between">
                    <div className="d-flex">
                        <i className="material-icons">shopping_cart</i>
                        <h4>Checkout</h4>
                    </div>
                    <div className="d-flex">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => this.props.onBack()}>Back</button>
                    </div>
                </div>
                <div className="card-body">

                    <form className="needs-validation" onSubmit={handleSubmit(this.onSubmit)}>
                        {this.renderFields()}
                        <div className="text-right">
                            <button
                                className="btn btn-primary btn-danger"
                                type="submit"
                                disabled={!this.props.valid}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {userId: state.auth.userId, orderItems: state.shop.cartItems, totalPrice: state.shop.totalPrice};
}

export default compose(reduxForm({form: 'CheckoutForm'}), connect(mapStateToProps, actions))(Checkout);