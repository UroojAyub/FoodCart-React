import React, {Component} from 'react'
import './order-basket.css';
import _ from 'lodash';
import {getItemComponent} from '../../food/index';

export default class OrderBasket extends Component {

    createOrderItemList = () => {
        return (
            <ul className="list-group">
                {_.map(this.props.orderItems, (item, name) => {
                    return (
                        <li className="list-group-item d-flex flex-row" key={name}>
                            <div className="list-item-img">
                               {getItemComponent(name)}
                            </div>
                            <div className="list-item-data">
                                <div>Name:
                                    <strong> {item.name}</strong>
                                </div>
                                <div>Quantity:
                                    <strong> {item.count}</strong>
                                </div>
                                <div>Price:
                                    <strong> ${(item.price * item.count).toFixed(2)}</strong>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        let items = null;
        let checkoutDisable = true;
        if (!this.props.orderItems || _.isEmpty(this.props.orderItems)) {
            items = (
                <div className="h-100 my-5">
                    <h5>Add some items</h5>
                </div>
            )
            checkoutDisable = true;
        } else {
            items = this.createOrderItemList();
            checkoutDisable = false;
        }

        return (
                <div className="card h-100">
                    <div className="card-header bg-dark text-light d-flex justify-content-between">
                        <div className="d-flex">
                            <i className="material-icons">shopping_basket</i>
                            <h4>Basket</h4>
                        </div>
                        <div className="d-flex">
                            <button type="button" className="btn btn-primary btn-sm" disabled={checkoutDisable}>Checkout</button>
                        </div>
                    </div>
                    <div className="card-body text-center">
                        {items}
                    </div>
                </div>
        )
    }
}