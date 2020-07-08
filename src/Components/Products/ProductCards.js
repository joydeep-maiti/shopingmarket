import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './productCards.css';

export default class ProductCards extends Component {

    state = {
        addedProduct: this.props.inCart
    }

// checkCart = ()=>{
//     console.log("check cart");
    
//     let filteredProduct= this.props.cartData.filter((product)=>{
//         return product.productDetails.id === this.props.product.id
//     })

//     if(filteredProduct)
//         this.setState({addedProduct: true})
// }

    addProduct = (product) => {
        this.setState({ addedProduct: true })
        console.log("wwww", this.state.addedProduct);
        this.props.addToCart(product)
    }

    removeProduct = (product) => {
        this.setState({ addedProduct: false })
        console.log("wwww", this.state.addedProduct,product);
        this.props.removeFromCart(product);
    }

    buyNowProduct = (product) => {
        this.setState({ addedProduct: true })
        this.props.buyNow(product)
    }

    render() {
        // this.checkCart();
        let title;
        if (this.props.product.title.length >= 46)
            title = ((this.props.product.title.toUpperCase()).slice(0, 46)) + '...'
        else
            title = this.props.product.title.toUpperCase()
        return (
            <div className="col-lg-4 col-md-6 col-xs-6">
                <div className="card product">
                    <Link to={`/productDetails/${this.props.product.id}`}><img className='card-img-top productimg' src={this.props.product.thumbnailUrl} alt="products"></img></Link>
                    <div className="card-body">
                        <h4 className='card-title'>{title}</h4>

                        <StarRatings
                            className="ratings"
                            rating={this.props.product.ratings}
                            starRatedColor="orange"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="2px"
                            name='rating'
                        />

                        <p><b className='card-text'>Rs.{this.props.product.price}</b></p>
                        <p>
                            {!this.state.addedProduct && <button className="btn btn-success card-button" onClick={() => this.buyNowProduct(this.props.product)}>Buy Now</button>}
                            {!this.state.addedProduct && <button className="btn btn-primary card-button" onClick={() => this.addProduct(this.props.product)}>Add to Cart</button>}
                        
                            {this.state.addedProduct && <span><span className='checkMark'>&#10003;</span><span>Added to cart</span></span>}
                        </p>
                        <p>
                            {this.state.addedProduct && <button className="btn btn-danger card-button" onClick={() => this.removeProduct(this.props.product)}>Remove</button>}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
