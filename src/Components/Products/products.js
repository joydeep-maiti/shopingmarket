import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getProducts } from '../../actions/products';
import * as actionCreaters from '../../actions/products';
import Promotions from './Promotions';
import ProductCards from './ProductCards';
import Filters from '../Filters/Filters';
import { SET_SORT } from '../../constants/products';
import ProductsCatalog from '../ProductsCatalog/ProductsCatalog'
class Products extends React.Component {
    constructor(props) {
        super(props)
        this.props.getProducts((this.props.location.pathname).slice(10))
        // this.state = {
        //     products: [],
        //     showingFilter:false
        // }
    }
    state={
        products: [],
        showingFilter:false
    }

    showingFilters(val) {
        console.log("SHOWING FILTER ", val)
        
    }
    componentDidMount() {
        console.log("PRoduct mounted")
        this.props.setSort(null);
    }
    componentWillUnmount() {
        console.log("PRoduct will unmounted")
    }

    buyNowFn=(product)=>{
        this.props.addProductToCart(product, this.props.auth)
        this.props.history.push('/nav_cart')
    }

    render() {
        // console.log("propsss", this.props);
        let allProducts = this.props.allProducts;
        let data = [], filteredProduct = [];
        

        if (allProducts) {
            if(this.props.sort){
                allProducts.sort((a,b)=>{
                    if(this.props.sort === "low")
                        return parseInt(a.price)-parseInt(b.price)
                    return parseInt(b.price)-parseInt(a.price)
                })
            }
            console.log("allProducts", allProducts)
            data = allProducts.map((product) => {
                let inCart = false;
                if (this.props.cartData && this.props.cartData.length !== 0) {
                    filteredProduct = this.props.cartData.filter((cartProduct) => {
                        return cartProduct.productDetails.id === product.id
                    })
                }

                if (filteredProduct.length !== 0) {
                    inCart = true;
                }
                return <ProductCards key={product.id} product={product} addToCart={(product) => this.props.addProductToCart(product, this.props.auth)}
                    inCart={inCart} removeFromCart={() => this.props.removeProductFromCart(product, this.props.auth)} 
                    buyNow={(product)=>this.buyNowFn(product)} />
            })
        }
        return (
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-xs-0 filter">
                    <Filters />
                    </div>
                    <div className="col-lg-10 col-md-10 col-xs-12">
                        <div className="row">
                            <Promotions category={(this.props.location.pathname).slice(10)} />
                        </div>
                        <div className="row">
                            <ProductsCatalog showingFilters={(val)=> this.showingFilters(val)}/>
                        </div>
                        {!this.state.showingFilter && <div className="row">
                            {data}
                        </div>}
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("sttt", state);
    return {
        allProducts: state.productData,
        auth: state.auth,
        cartData: state.cart,
        sort: state.sort
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSort: (sort) => dispatch({ type:SET_SORT, sort}),
        getProducts: (data) => dispatch(getProducts(data)),
        addProductToCart: (product, auth) => dispatch(actionCreaters.addToCart(product, auth)),
        removeProductFromCart: (product, auth) => dispatch(actionCreaters.removeFromCart({ productDetails:product, qty: 1 }, auth)),
        // addProductToCart2: (product) => dispatch({ type: ADD_PRODUCT_TO_CART, data: product }),
        // removeProductFromCart2: (product) => dispatch({ type: REMOVE_PRODUCT_FROM_CART, productData: product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products))

