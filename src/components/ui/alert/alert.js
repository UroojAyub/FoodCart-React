import React from 'react'
import './alert.css';

const Alert = (props) => {
    if (!props.show) {
        return null;
    }
    const classes=`alert ${props.type} alert-dismissible fade show`
    return (
        <div className={classes} role="alert">
            {props.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={()=>props.onClose()}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default Alert
