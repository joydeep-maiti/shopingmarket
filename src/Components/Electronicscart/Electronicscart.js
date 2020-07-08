import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Electronicscart.css';
import { connect } from 'react-redux';
import  cart  from './cart.jpg';
//import {UPDATE_QUANTITY} from '../../constants/products';
//import {UPDATE_SUBTOTAL} from '../../constants/products';
import { UPDATE_QUANTITY } from '../../constants/products';
import { UPDATE_SUBTOTAL } from '../../constants/products';
import * as actionCreaters from '../../actions/products';
import {withRouter} from 'react-router-dom'

class Electronicscart extends Component {
    state = {
        electronics: [],
        quantity: ''
    }
  
    //  value = this.menu.value;
    handleChange = (e, product) => {
        console.log("quantity", e.target.value, this.props.auth)
        //  this.setState({quantity:e.target.value}) 
        this.props.updateQuantity(product, Number(e.target.value), this.props.auth)
    }

    deleteFromCart = (product) => {
        console.log("in delete from cart electronicscart");
        this.props.removeProductFromCart(product, this.props.auth)
    }

    addToSaveForLaterFn = (product) => {
        console.log("in addToSaveForLaterFn from cart electronicscart");
        this.props.addToSaveForLater(product, this.props.auth);
    }

    addToCartFn = (product) => { }

    // onProceedToPayClick = () => {
    //     if(this.props.auth && this.props.auth.is_authenticated === false) {
    //         this.props.history.push('/signin')
    //     }
    //     else {
    //         console.log('here')
    //         this.props.history.push('/select_address')
    //     }
    // }

    render() {
        if(this.props.product ==""){
            return(
            <div className="emptyCart">
                    <img src={ cart } alt="EmptyCart" className="emptycartImage"></img>
                    <div className="emptycartContent" >
                     <ul >
                      <li><h2> Your Cart is empty</h2></li>
                      <li><Link to='/signin'><button className="signinButton"><b>Sign in to your account</b></button></Link></li>
                     </ul>
                     </div> 
             </div>
             
            )
        }
        else{
            let subTotal = 0;
            let qtyTotal = 0;
            this.props.product ? this.props.product.map((item) => {
               subTotal = subTotal + item.productDetails.price * item.qty;
                 qtyTotal = qtyTotal + item.qty;
           }) : ""
           subTotal = subTotal.toString();
           var lastThree = subTotal.substring(subTotal.length - 3);
           var otherNumbers = subTotal.substring(0, subTotal.length - 3);
           if (otherNumbers != '')
               lastThree = ',' + lastThree;
          var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
           let checkoutData = [];
             if (this.props.product) {
                     checkoutData = <div className="ckout">{
                      this.props.product.map((product) => {
                    return (
                        <div className="checkoutData-div">
                            <div className="checkoutDataSpan-title">{(product.productDetails.title).substring(0, 45) + '...'}</div>
                            <div className="checkoutDataSpan">{product.productDetails.price}</div>
                            <div>{product.qty}</div>
                        </div>)
                })
            }
            </div>
            }
            const Subtotal = <div className="cartsubTotal">
                       <span><p id="total1">Subtotal&nbsp;({qtyTotal} items):<strong>INR {res}</strong></p></span>
                       </div>;
            return(
                
    
            
                <div className="prntDiv">

                    <div className="eMainDiv">
                        <div className="cartdiv">
                            <div className="priceNameDiv">
                                <h5 className="price">Price</h5>
                            </div>
                            <div className="sCart">
                                <h2><strong>Shopping Cart</strong></h2>
                            </div>
                            <div className="mCartSummary">
                                <h5>Checkout Summary</h5>
                                <div className="proceedToBuyDiv">
                                    <Link to="/select_address">  <button className="proceedToBuyButton">Proceed To Pay</button></Link>
                                </div>
                            </div>


                            {this.props.product ? this.props.product.map((item) =>

                                <div className="mapDiv">
                                    <hr />
                                    <div className="price">
                                        <p><b><i class="fas fa-rupee-sign"></i>{item.productDetails.price.toLocaleString()}</b></p>
                                    </div>
                                    <div className="pimage">
                                        <img src={item.productDetails.thumbnailUrl} alt="Electronics" className="cart_items" />
                                    </div>
                                    <div className="contentDiv">
                                        <ul>
                                            <li> <Link to={`/productDetails/${item.productDetails.id}`} className="ptitle">{item.productDetails.title}</Link></li>
                                            <li className="mPrice">
                                                <b><i class="fas fa-rupee-sign"></i>{item.productDetails.price.toLocaleString()}</b>
                                            </li>
                                        </ul>
                                        <div className="secondContentDiv">
                                            <label for="qty">Qty:&nbsp;</label>
                                            <select name="quantity" id="cars" value={item.qty} onChange={(event) => this.handleChange(event, item.productDetails)}  >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>&nbsp;&nbsp;
                                    <span>|</span>&nbsp;&nbsp;
                                            <span className="delete_cart" onClick={() => this.deleteFromCart(item)}>Delete</span>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
                                            <span className="delete_cart" onClick={() => this.addToSaveForLaterFn(item)}>Save for later</span>&nbsp;&nbsp;
                                    </div>

                                    </div>

                                </div>)
                                : ""
                            }

                            <hr />



                        </div>
                        <div className="cartSummary">
                            <h4>Checkout Summary</h4>
                            {Subtotal}
                            {checkoutData}
                            <div className="proceedToBuyDiv">
                                <Link to="/select_address"><button className="proceedToBuyButton">Proceed To Pay</button></Link>
                            </div>
                        </div>
                        <div className="subTotal">
                            <span><p id="total">Subtotal&nbsp;({qtyTotal} items):<strong>INR {res}</strong></p></span>
                        </div>

                        <div className="cartdiv">
                            <div className="sCart">
                                <h2><strong>Save For Later</strong></h2>
                            </div>

                            {this.props.savedForLater ? this.props.savedForLater.map((item) =>

                                <div className="mapDiv">
                                    <hr />
                                    <div className="price">
                                        <p><b><i class="fas fa-rupee-sign"></i>{item.productDetails.price.toLocaleString()}</b></p>
                                    </div>
                                    <div className="pimage">
                                        <img src={item.productDetails.thumbnailUrl} alt="Electronics" className="cart_items" />
                                    </div>
                                    <div className="contentDiv">
                                        <ul>
                                            <li> <Link to={`/productDetails/${item.productDetails.id}`} className="ptitle">{item.productDetails.title}</Link></li>
                                            <li className="mPrice">
                                                <b><i class="fas fa-rupee-sign"></i>{item.productDetails.price.toLocaleString()}</b>
                                            </li>
                                        </ul>
                                        <div className="secondContentDiv">
                                            <label for="qty">Qty:&nbsp;</label>
                                            <select name="quantity" id="cars" value={item.qty} onChange={(event) => this.handleChange(event, item.productDetails)}  >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>&nbsp;&nbsp;
                                    <span>|</span>&nbsp;&nbsp;
                                            <span className="delete_cart" onClick={() => this.props.removeFromSaveForLater(item, this.props.auth)}>Delete</span>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
                                            <span className="delete_cart" onClick={() => this.props.removeAndAddToCart(item, this.props.auth)}>Add to Cart</span>&nbsp;&nbsp;
                                    </div>

                                    </div>

                                </div>)
                                : ""
                            }

                        </div>
                    </div>


                </div>
            )
            
            
        }
    }
}

const mapStateToProps = (state) => {
    console.log("sttt", state);
    return {
        product: state.cart,
        auth: state.auth,
        savedForLater: state.savedForLater
    }
}



const mapDispatchToProps = dispatch => {
    return {
        removeProductFromCart: (product, auth) => dispatch(actionCreaters.removeFromCart(product, auth)),
        updateQuantity: (product, value, auth) => dispatch(actionCreaters.updateCart({ id: product.id, quantity: value }, auth)),
        addToSaveForLater: (product, auth) => dispatch(actionCreaters.addToSaveForLater(product, auth)),
        removeFromSaveForLater: (product, auth) => dispatch(actionCreaters.removeFromSaveForLater(product, auth)),
        removeAndAddToCart: (product, auth) => dispatch(actionCreaters.removeFromSaveForLaterAndAddToCart(product, auth))
        // updateQuantity : (product,value)=>dispatch({type: UPDATE_QUANTITY, productData:product,quantity:value})
    }
}


// export default Electronicscart;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Electronicscart))
