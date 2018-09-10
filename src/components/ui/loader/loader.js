import React from 'react'
import './loader.css';

const Loader = (props) => {
    if (!props.show) {
        return null;
    }
    return (
        <div className='overlay'>
            <div className='spinner'></div>
        </div>
    )
}

export default Loader
