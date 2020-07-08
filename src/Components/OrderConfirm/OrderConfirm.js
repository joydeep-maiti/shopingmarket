import React from 'react'
import './OrderConfirm.css'

const orderConfirm = (props) => {
    return (
        <div className="orderConfmDiv">
            <div className="tickDiv">
                <div className="tickDiv1"></div>
                <div className="tickDiv2"></div>
            </div>
            <div className="orderInfoDiv">
                Your Order is placed Successfully! Order No: {props.orderId}
            </div>
        </div>
    )
}

export default orderConfirm;