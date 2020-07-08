import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';

// import Carousel from 'react-bootstrap/Carousel';
// import StarRatings from 'react-star-ratings';
import {
    addToCart, addToSaveForLater, removeFromSaveForLater, removeFromCart, updateCart,
    removeFromSaveForLaterAndAddToCart, getOrders, deleteOrder
} from '../../actions/products';
import './myOrder.css'


class ProductDetails extends Component {

    state = {
    }

    UNSAFE_componentWillMount() {
        this.props.getOrders(this.props.auth);
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        // this.props.getProductDetails(this.props.match.params.id);
    }

    buyNowFn = (product) => {
        this.props.addToCart(product, this.props.auth)
        this.props.history.push('/nav_cart')
    }

    delete = (orderId, subOrderId) => {
        this.props.deleteOrder(this.props.auth, orderId, subOrderId);
    }



    render() {
        let sortedMyOrder;
        function compareOrder(a, b) {
            let a_order = a.orderId.split("_")[1];
            let b_order = b.orderId.split("_")[1];

            if (Number(a_order) > Number(b_order))
                return -1
            else
                return 1
        }

        console.log("orrrrrrr", this.props.myOrders);

        if (this.props.myOrders) {
            sortedMyOrder = [...this.props.myOrders]
            sortedMyOrder.sort(compareOrder)
            console.log("orrrrrrr111111111", sortedMyOrder);
        }

        return (
            <div>
                <h1 className="order-heading">My Orders</h1>
                {this.props.myOrders ? sortedMyOrder.map((OrdersItem) =>
                    <div className="card order-card">
                        <div class="card-header o1">
                            <div className="order-header-left">
                                <div className="order-header-left-in">
                                    ORDER PLACED ON
                                    <div>{OrdersItem.orderedDate}</div>
                                </div>
                                <div className="order-header-left-in">
                                    TOTAL
                                    <div><i class="fas fa-rupee-sign"></i> {OrdersItem.total.toLocaleString()}</div>
                                </div>
                                <div className="order-header-left-in">
                                    SHIP TO
                                    <div>{OrdersItem.address.name}</div>
                                </div>
                            </div>

                            

                            <div className="order-header-right">
                                ORDER ID #
                                <div>{OrdersItem.orderId}</div>
                            </div>

                            <div className="order-header-right">
                                <div><button className="btn btn-danger order-card-butn1" onClick={() => this.delete(OrdersItem.orderId, "")}>Cancel</button></div>
                            </div>

                        </div>
                        <div class="card-body">
                            {!this.props.myOrders && <h5 class="card-title">You haven't ordered products yet</h5>}


                            {OrdersItem ? OrdersItem.order.map((item) =>

                                <div className="mapDiv">

                                    <div className="price">
                                        <div><button className="btn btn-primary order-card-butn" onClick={() => this.buyNowFn(item.productDetails)}>Buy Again</button></div>
                                        <div><button className="btn btn-danger cancelorder-card-butn" onClick={() => this.delete(OrdersItem.orderId, item.subOrderId)} >Cancel</button></div>
                                        {/* <p><b><i class="fas fa-rupee-sign"></i>{item.productDetails.price.toLocaleString()}</b></p> */}
                                    </div>
                                    <div className="order-image">
                                        <img src={item.productDetails.thumbnailUrl} alt="Electronics" className="cart_items" />
                                    </div>
                                    <div className="order-contentDiv">
                                        <div>
                                            <ul>
                                                <li> <Link to={`/productDetails/${item.productDetails.id}`} className="prd-title">{item.productDetails.title}</Link></li>
                                            </ul>
                                        </div>
                                        <div className="secondContentDiv">
                                            <div className="p-price"><b><i class="fas fa-rupee-sign"></i> {item.productDetails.price.toLocaleString()}</b></div>
                                            <div className="p-price1">Quantity : {item.qty}</div>
                                            <div className="p-price1">Order ID : {item.subOrderId}</div>
                                            {/* <span>|</span>&nbsp;&nbsp;
                                                <span className="delete_cart" onClick={() => this.addToSaveForLaterFn(item)}>Save for later</span>&nbsp;&nbsp; */}
                                        </div>
                                    </div>
                                </div>)
                                : ""
                            }
                        </div>
                    </div>)
                    : (

                        <div class="card-body">
                            {!this.props.myOrders && <h3>You haven't ordered products yet</h3>}
                            <Link to="/" class="btn btn-primary">Continue Shopping</Link>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        products: state.productData,
        auth: state.auth,
        savedForLater: state.savedForLater,
        cart: state.cart,
        myOrders: state.myOrders
    }
}

export default connect(mapStateToProps,
    {
        addToCart, addToSaveForLater, removeFromSaveForLater, removeFromCart, updateCart,
        removeFromSaveForLaterAndAddToCart, getOrders, deleteOrder
    })(withRouter(ProductDetails))