import React from 'react';
import  './Cart.css';
import { connect } from 'react-redux';

import Electronicscart from '../Electronicscart/Electronicscart';

class Cart extends React.Component{
    render(){
        return(
            
            <div className="cartPage">
                   <Electronicscart /> 
                 
            </div>
            
        
            
           
            

        )
    }
}

const mapStateToProps = state => {
    return {
        cartData : state.cart
    }
}

export default connect(mapStateToProps)(Cart);