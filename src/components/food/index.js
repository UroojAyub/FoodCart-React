import React from 'react'
import Burger from './burger/burger';
import Pizza from './pizza/pizza';
import Fries from './fries/fries';

const getItemComponent = (itemKey) => {
    switch (itemKey) {
        case 'burger':
            return <Burger/>;

        case 'pizza':
            return <Pizza/>;

        case 'fries':
            return <Fries/>;

        default:
            return null;

    }
}

export {getItemComponent};