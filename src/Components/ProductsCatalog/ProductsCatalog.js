import React from 'react'
import './ProductsCatalog.css'
import ProductCards from '../Products/ProductCards'
import { connect } from 'react-redux' 
import * as actionCreaters from '../../actions/products';

class ProductsCatalog extends React.Component {

    showingFilters(val) {
        console.log(val, this.props)
        this.props.showingFilters(val);
    }
    render () {
        let allProducts = this.props.allProducts;
        let data = [], filteredProduct = [];
        let filterMsg = allProducts?allProducts.length > 0?<h3>Showing Results for<i>{" '"+this.props.searchKey+"' "}</i></h3>:null:null


        if(allProducts && allProducts.length === 0 && this.props.searchKey !==""){
            filterMsg = <h3>No results found for <i>{" '"+this.props.searchKey+"' "}</i></h3>
        }
        if(filterMsg) {
            this.showingFilters(true);
        }else {
            this.showingFilters(false);
        }
        if (allProducts) {
            if(this.props.sort){
                allProducts.sort((a,b)=>{
                    if(this.props.sort === "low")
                        return parseInt(a.price)-parseInt(b.price)
                    return parseInt(b.price)-parseInt(a.price)
                })
            }
            data = allProducts.map((product) => {
                let inCart = false;
                if (this.props.cartData.length !== 0) {
                    filteredProduct = this.props.cartData.filter((cartProduct) => {
                        return cartProduct.productDetails.id === product.id
                    })
                }

                if (filteredProduct.length !== 0) {
                    inCart = true;
                }
                return <ProductCards key={product.id} product={product} addToCart={(product) => this.props.addProductToCart(product, this.props.auth)}
                    inCart={inCart} removeFromCart={() => this.props.removeProductFromCart(product, this.props.auth)} />
            })
        }

        return(
            <div className="col-lg-12 col-md-12 col-xs-12 filterMsg">
                {filterMsg  && 
                <div className="row ">
                    {filterMsg}
                </div>}
                <div className="row">
                    {data}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allProducts: state.filteredProducts,
        auth: state.auth,
        cartData: state.cart,
        searchKey:state.searchKey,
        sort: state.sort
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: (product, auth) => dispatch(actionCreaters.addToCart(product, auth)),
        removeProductFromCart: (product, auth) => dispatch(actionCreaters.removeFromCart({ productDetails:product, qty: 1 }, auth)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsCatalog);