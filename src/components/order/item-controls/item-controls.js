import React, {Component} from 'react';
import './item-controls.css';
import _ from 'lodash';
import {getItemComponent} from '../../food/index';

class ItemControls extends Component {

    renderItems = () => {
        return _.map(this.props.items, (item, name) => {
            let disabledRemove = this.props.orderItems && this.props.orderItems[name]? false: true;
            return (
                <div className="d-flex flex-row justify-content-around my-4" key={name}>

                    <div className="align-self-center item-control">
                        <button
                            className="btn btn-sq btn-danger"
                            onClick={() => this.props.onRemoveItem(name)}
                            disabled={disabledRemove}>
                            -
                        </button>
                    </div>

                    <div className="item">
                        <div className="item-shape">{getItemComponent(name)}</div>
                        <div className="item-name">{item.name}</div>
                    </div>

                    <div className="align-self-center item-control">
                        <button className="btn btn-sq btn-success" onClick={() => this.props.onAddItem(name)}>
                            +
                        </button>
                    </div>

                    
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="card h-100">

                    <div className="card-header bg-dark text-light d-flex">
                        <i className="material-icons">fastfood</i>
                        <h4>Food Items</h4>
                    </div>

                    <div className="card-body text-center">

                        {this.renderItems()}

                    </div>
                </div>
            </div>
        )
    }
}

export default ItemControls