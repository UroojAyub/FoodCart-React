import React from 'react';
import './shop-layout.css';
import Navbar from '../../navigation/navbar/navbar';

const ShopLayout = (props) => {
    return (
        <div>
            <Navbar/>
            <div className='content'>
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ShopLayout;
