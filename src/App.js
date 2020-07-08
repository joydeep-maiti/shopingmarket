import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer';
import Cart from './Components/Cart/Cart';
import Home from './Components/Home/Home';
import Admin  from './Components/Admin/Admin';
import Address from './Components/Address/Address';
import Products from './Components/Products/products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import OrderConfirm from './Components/OrderConfirm/OrderConfirm';
import MyOrders from './Components/MyOrders/MyOrder';
import MyProfile from './Components/MyProfile/MyProfile';
import * as actionTypes from './constants/products'
import { syncCartWithDb } from './actions/products'
import Electronicscart from './Components/Electronicscart/Electronicscart';



class App extends Component {

  state = {
    auth: {
      is_authenticated : false,
      userId: null,
      username : null,
      name : null,
      token : null,
      role : null
    }
  }

  componentWillMount = () => {
    if (!sessionStorage.length) {
      // Ask other tabs for session storage
      localStorage.setItem('getSessionStorage', Date.now());
    }else {
      this.setAuth();
    }

    const self = this;
    window.addEventListener('storage', function(event) {

      // console.log('storage event', event);
  
      if (event.key === 'getSessionStorage') {
        // Some tab asked for the sessionStorage -> send it
  
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        localStorage.removeItem('sessionStorage');
  
      } 
      else if (event.key === 'sessionStorage' && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        // console.log("settinh session")
        let data = JSON.parse(event.newValue);
  
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
        self.setAuth();
      }
      else if (event.key === 'updateSessionStorage') {
        // sessionStorage is empty -> fill it
        console.log("setting updated session")
        let data = JSON.parse(event.newValue);
  
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
        self.setAuth();
      }
    });
    console.log(this.props)
  }
 

  setAuth = () => {
    // console.log("In Set auth")
    const sessionAuth = JSON.parse(sessionStorage.getItem("Auth"));
    // console.log("componentdidmout",sessionAuth)
    if(sessionAuth) {
      this.props.authUpdate(sessionAuth)
      this.setState({
        auth: sessionAuth
      })
      if(sessionAuth.is_authenticated){
        this.props.syncCart(this.props.cart, this.props.savedForLater, sessionAuth)
      }else{
        this.props.resetCart();
      }
    }
  }


  onAuthHandler = (authData) => {
    console.log("onAuthHandler.....",this.props);
    
    sessionStorage.setItem("Auth",JSON.stringify({is_authenticated : true,...authData}));
    this.props.authUpdate({is_authenticated : true,...authData})
    this.setState({
      is_authenticated : true,
      auth: authData
    })
    localStorage.setItem('updateSessionStorage',  JSON.stringify(sessionStorage));
    localStorage.removeItem('updateSessionStorage');

    this.props.syncCart(this.props.cart, this.props.savedForLater, authData)
  }

  signOutHandler = () => {
    sessionStorage.setItem("Auth",JSON.stringify({is_authenticated : false}));
    this.props.authUpdate({
      is_authenticated : false,
      userId: null,
      username : null,
      name : null,
      token : null,
      role : null
    })
    this.setState({
      auth: {
        is_authenticated : false,
        userId: null,
        username : null,
        name : null,
        token : null,
        role : null
      }
    })
    this.props.resetCart();
    localStorage.setItem('updateSessionStorage',  JSON.stringify(sessionStorage));
    localStorage.removeItem('updateSessionStorage');
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="App">
        {this.props.location.pathname !== '/signin' && this.props.location.pathname !== '/signup' && 
        this.props.location.pathname !== '/select_address' && !this.props.location.pathname.includes("/admin")  && 
        this.props.location.pathname !== '/order_confirmation_page' && 
        <Header name={this.state.auth.name} onSignout={this.signOutHandler}/> }
        
         
        <Switch>
          <Route exact path="/signin" > <Signin onAuth={(authData)=>this.onAuthHandler(authData)}/> </Route>
          <Route exact path="/signup" ><Signup /></Route>
          <Route exact path="/nav_cart" > <Cart /> </Route>
          <Route exact path="/products/:category"> <Products /> </Route>
          <Route exact path="/select_address"> <Address/> </Route>
          <Route exact path="/productDetails/:id"> <ProductDetails /> </Route>
          <Route exact path="/order_confirmation_page"> <OrderConfirm /> </Route>
          <Route exact path="/myOrders"> <MyOrders/> </Route>
          <Route exact path="/profile"> <MyProfile/> </Route>
          {this.state.auth.role === "admin" && <Route  path="/admin"> <Admin/> </Route>}
          <Route path="/"> <Home /> </Route>
           
        </Switch>
        
        {this.props.location.pathname !== '/signin' && this.props.location.pathname !== '/signup' && 
        this.props.location.pathname !== '/select_address' && !this.props.location.pathname.includes("/admin") && 
        this.props.location.pathname !== '/order_confirmation_page'  && <Footer />}
     
        
      </div>
    );
  }
}


const mapStateToProps = (state) => {  
  return {
    cart:state.cart,
    savedForLater: state.savedForLater,
    auth: state.savedForLater
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authUpdate : (auth)=>dispatch({type: actionTypes.SET_AUTH, data:auth }),
    syncCart : (cart, savedForLater, auth)=>dispatch(syncCartWithDb(cart , auth, savedForLater)),
    resetCart : ()=>dispatch({type:actionTypes.RESET_CART})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));