import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Loader from '../../components/ui/loader/loader';
import Alert from '../../components/ui/alert/alert';
import OrderListItem from '../../components/order/list-item/list-item';
import _ from 'lodash';

class Orders extends Component {

    componentWillMount() {
        this
            .props
            .fetchOrders(this.props.userId);
    }

    renderOrderList = (list) => {
        if (_.isEmpty(list)) {
            return <p>No orders found</p>
        }
        return (
            <ul className="list-group">
                {_.map(list, (order, oid) => {
                    return <li key={oid} className="list-group-item"><OrderListItem {...order}/></li>
                })}
            </ul>
        )
    }

    render() {
        const listContent = this.props.orderList
            ? this.renderOrderList(this.props.orderList)
            : 'Loading...';

        return (
            <div>
                <Loader show={this.props.loading}/>
                <Alert
                    show={this.props.showAlert}
                    type={this.props.alertType}
                    message={this.props.alertMessage}
                    onClose={this.props.clearSuccessError}/>
                <div className="card h-100">
                    <div className="card-header bg-dark text-light d-flex justify-content-between">
                        <h4>Your Orders</h4>
                    </div>

                    <div className="card-body">
                        {listContent}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orderList: state.shop.userOrders,
        userId: state.auth.userId,
        loading: state.shop.loading,
        showAlert: state.shop.error
            ? true
            : false,
        alertType: state.shop.error
            ? 'alert-danger'
            : '',
        alertMessage: state.shop.error
            ? state.shop.error
            : ''
    }
}
export default connect(mapStateToProps, actions)(Orders)
