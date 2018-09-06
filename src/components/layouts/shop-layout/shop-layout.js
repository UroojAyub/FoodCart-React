import React from 'react';
import  './shop-layout.css';
import Navbar from '../../navigation/navbar/navbar';


const ShopLayout = (props) => {
    return (
        <div>
            <Navbar/>
            <main className='content'>
                {props.children}
            </main>
        </div>
    )
}

export default ShopLayout;
