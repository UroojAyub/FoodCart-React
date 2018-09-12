import React from 'react'
import _ from 'lodash';

const OrderListItem = ({items, timestamp, totalPrice, userInfo}) => {
    const orderItems = _.map(items, (item, itemName) => {
        return (
            <span className="badge badge-pill badge-primary mx-2 p-2" key={itemName}>
                {item.name}:
                <strong> {item.count}</strong>
            </span>
        )
    });
    return (
        <div className="row">
            <div className="col-md-6 flex-column">
                <p>Items: {orderItems}</p>
                <p>Total Price:
                    <strong>${totalPrice.toFixed(2)}</strong>
                </p>
                <p>Date: {new Date(timestamp).toUTCString()}</p>
            </div>
            <div className="col-md-6 flex-column">
                <div>User Name: {userInfo.name}</div>
                <div>Email: {userInfo.email}</div>
                <div>Address: {userInfo.address}</div>
                <div>Delivery Mode: {userInfo.deliveryMethod}</div>
            </div>
        </div>
    )
}

export default OrderListItem
