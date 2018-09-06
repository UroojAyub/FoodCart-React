import React, {Component} from 'react'
import OrderBasket from '../../components/order/order-basket/order-basket';
import ItemControls from '../../components/order/item-controls/item-controls';
import Burger from '../../components/food/burger/burger'
import Pizza from '../../components/food/pizza/pizza';
import Fries from '../../components/food/fries/fries';
import _ from 'lodash';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsList: {
                burger: {
                    name: 'Chicken Burger',
                    price:2.4,
                    component: <Burger/>
                },
                pizza: {
                    name: 'Pepperoni Pizza',
                    price:1.1,
                    component: <Pizza/>
                },
                fries: {
                    name: 'Crispy Fries',
                    price:0.5,
                    component: <Fries/>
                }
            },
            basketItems: null
        }
    }

    onAddItem = (itemName) => {
        const basketItems = {
            ...this.state.basketItems
        }
        if (basketItems[itemName]) {
            const updatedCount = basketItems[itemName].count + 1;
            this.setState({
                basketItems: {
                    ...this.state.basketItems,
                    [itemName]: {
                        ...this.state.basketItems[itemName],
                        count: updatedCount
                    }
                }
            })
        } else {
            const newBasketItem = {
                ...this.state.itemsList[itemName],
                count: 1
            };
            this.setState({
                basketItems: {
                    ...this.state.basketItems,
                    [itemName]: newBasketItem
                }
            })
        }
    }

    onRemoveItem = (itemName) => {
        const basketItems = {
            ...this.state.basketItems
        }
        if (basketItems[itemName]) {
            const updatedCount = basketItems[itemName].count - 1 >= 0
                ? basketItems[itemName].count - 1
                : 0;
            if (updatedCount === 0) {
                this.setState({
                    basketItems: {
                        ..._.omit(this.state.basketItems, itemName)
                    }
                })
            } else {
                this.setState({
                    basketItems: {
                        ...this.state.basketItems,
                        [itemName]: {
                            ...this.state.basketItems[itemName],
                            count: updatedCount
                        }
                    }

                })
            }
        }
    }
    componentWillUpdate(props, state) {
        console.log(state.basketItems)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 flex-column">
                            <OrderBasket orderItems={this.state.basketItems}/>
                        </div>
                        <div className="col-md-6  flex-column">
                            <ItemControls
                                items={this.state.itemsList}
                                orderItems={this.state.basketItems}
                                onAddItem={this.onAddItem}
                                onRemoveItem={this.onRemoveItem}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shop