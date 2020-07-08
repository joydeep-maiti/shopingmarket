import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import StarRatings from 'react-star-ratings';
import { addToCart, addToSaveForLater, removeFromSaveForLater, removeFromCart, updateCart,
    removeFromSaveForLaterAndAddToCart } from '../../actions/products';
import './productDetails.css';

class ProductDetails extends Component {

    state = {
        addedSaveForLater: false,
        addedToCart: false,
        quantity: 1
    }

    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        // this.props.getProductDetails(this.props.match.params.id);
    }

    addProduct = (product) => {
        console.log("qqqqq", this.state.quantity);

        this.setState({ addedToCart: true })
        this.props.addToCart(product, this.props.auth, this.state.quantity)
    }

    removeProduct = (product) => {
        // this.setState({ addedProduct: false })
        // console.log("wwww", this.state.addedProduct,product);
        this.setState({ addedToCart: false })
        this.props.removeFromCart({ productDetails: product, qty: 1 }, this.props.auth);
    }

    addToSaveForLaterFn = (product) => {
        this.setState({ addedSaveForLater: true })
        this.props.addToSaveForLater({ productDetails: product, qty: 1 }, this.props.auth)
    }

    removeFromSaveForLaterFn = (product) => {
        this.setState({ addedSaveForLater: false })
        this.props.removeFromSaveForLater({ productDetails: product, qty: 1 }, this.props.auth)
    }

    removeAndAddToCart = (product)=>{
        this.setState({ addedSaveForLater: false, addedToCart: true })
        this.props.removeFromSaveForLaterAndAddToCart(product, this.props.auth)
    }

    handleChange = (e, product) => {
        if (this.state.addedToCart) {
            this.setState({ quantity: Number(e.target.value) })
            this.props.updateCart({ id: product.id, quantity: Number(e.target.value) }, this.props.auth)
        }
        else
            this.setState({ quantity: Number(e.target.value) })
    }

    buyNowFn=(product)=>{
        this.setState({ addedToCart: true })
        this.props.addToCart(product, this.props.auth, this.state.quantity)
        this.props.history.push('/nav_cart')
    }

    render() {

        let addedSaveForLater = this.state.addedSaveForLater;
        let addedToCart = this.state.addedToCart;
        let product = this.props.products.filter((product) => {
            return product.id === this.props.match.params.id
        })

        if (this.props.savedForLater && this.props.savedForLater.length >= 1) {
            addedSaveForLater = this.props.savedForLater.filter((product) => {
                if (product.productDetails.id === this.props.match.params.id)
                    return true;
            })
            if (addedSaveForLater[0] === undefined || addedSaveForLater[0] === false)
                addedSaveForLater = false;
            else
                addedSaveForLater = true;
        }

        if (this.props.cart && this.props.cart.length >= 1) {
            console.log("gggggggggg");

            addedToCart = this.props.cart.filter((product) => {
                if (product.productDetails.id === this.props.match.params.id)
                    return true;
            })
            if (addedToCart[0] === undefined || addedToCart[0] === false)
                addedToCart = false;
            else
                addedToCart = true;
        }

        console.log("pppp", this.props, addedSaveForLater, addedToCart);

        return (
            <div>
                <span><button className="btn btn-danger back-butn" onClick={this.props.history.goBack}>Go Back</button></span>

            <div className="prodDetail-div">
            
                <Carousel className='product-carousel'>
                    <Carousel.Item className="product_item">
                        <img src={product[0].thumbnailUrl} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item className="product_item">
                        <img src={product[0].thumbnailUrl} alt="second slide" />
                    </Carousel.Item>
                    <Carousel.Item className="product_item">
                        <img src={product[0].thumbnailUrl} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>

                <div className="prod-details">
                    <h2>{product[0].title}</h2>
                    <hr className="hr-div" />
                    <div className="card pr-card">
                        <div className="card-body">

                            <div><button className="btn btn-primary card-butn" onClick={() => this.buyNowFn(product[0])}>Buy Now</button></div>
                            {!addedSaveForLater && !addedToCart && <div><button className="btn btn-primary card-butn" onClick={() => this.addProduct(product[0])}>Add to Cart</button></div>}
                            {!addedSaveForLater && addedToCart && <div><button className="btn btn-danger card-butn" onClick={() => this.removeProduct(product[0])}>Remove From Cart</button></div>}
                            {addedSaveForLater && !addedToCart && <div><button className="btn btn-danger card-butn" onClick={() => this.removeAndAddToCart({productDetails: product[0], qty: this.state.quantity})}>Move to Cart</button></div>}

                            {!addedSaveForLater && <div><span className="delete_cart" onClick={() => this.addToSaveForLaterFn(product[0])}>Save for later</span></div>}
                            {addedSaveForLater && <div><span className="delete_cart" onClick={() => this.removeFromSaveForLaterFn(product[0])}>Remove from Save for later</span></div>}
                        </div>
                    </div>
                    <div>
                        Ratings
                        <span>&nbsp; &nbsp;</span>
                        <StarRatings
                            className="ratings"
                            rating={product[0].ratings}
                            starRatedColor="orange"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            starDimension="23px"
                            starSpacing="3px"
                            name='rating'
                        />

                    </div>

                    <div className="price-div">
                        Price : <span className="price-rate">&nbsp; &nbsp;{product[0].price}</span>
                    </div>

                    <div className="qty-div">Quantity :&nbsp;
                            <select name="quantity" id="cars" value={this.state.quantity} onChange={(event) => this.handleChange(event, product[0])}  >
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
                        </select>
                    </div>


                    <div className="card des-card">
                        <div className="card-body des-card-body">
                            <h5 class="card-title">Description</h5>
                            <div>{product[0].shortDescription}</div>
                        </div>
                    </div>



                </div>
            </div>
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
        cart: state.cart
    }
}

export default connect(mapStateToProps,
    { addToCart, addToSaveForLater, removeFromSaveForLater, removeFromCart, updateCart,
        removeFromSaveForLaterAndAddToCart })(withRouter(ProductDetails))