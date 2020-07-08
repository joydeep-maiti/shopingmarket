import * as productsApi from '../api/products'
import {GETPRODUCTS_SUCCESS, GETPRODUCTS_FAILED, ADD_PRODUCT_TO_CART, UPDATE_QUANTITY} from '../constants/products'
import * as actionTypes from '../constants/products'
import * as services from '../Utility/Services'


export function getProducts(category) {
      return dispatch => {
            productsApi.getProducts(category)
                  .then(productData => {
                        dispatch({ type: GETPRODUCTS_SUCCESS, productData, category });
                        // dispatch({type:actionTypes.SEARCH_CART})
                  })
                  .catch(e => {
                        return dispatch({ type: GETPRODUCTS_FAILED, message: e.message })
                        console.log(e.message)
                  })
      }
}

export const addToCart = (data, auth, quantity) => {
      let qty1 = 1;
      if(quantity)
            qty1 = quantity;
      return dispatch => {
            console.log(data, auth)
            if(!auth || auth.is_authenticated === false){
                  dispatch(proceedAddToCart(data, qty1))
            }else if(auth.is_authenticated === true) {
                  services.addItemToCart({
                        productDetails:data,
                        qty:qty1
                  }, auth.token)
                  .then(()=>dispatch(proceedAddToCart(data, qty1)))
                  .catch(err=>{
                        console.log(err);
                        alert("Error");
                  })
            }
      }
}

const proceedAddToCart = (product, qty1) => {
      return {
            type: actionTypes.ADD_PRODUCT_TO_CART,
            data:product,
            qty: qty1
      }
}

export const removeFromCart = (data, auth) => {
      console.log("In removeFromCart")
      return dispatch => {
            console.log(data, auth)
            if(!auth || auth.is_authenticated === false){
                  dispatch(proceedRemoveFromCart(data))
            }else if(auth.is_authenticated === true) {
                  services.removeItemFromCart(data, auth.token)
                  .then(()=>dispatch(proceedRemoveFromCart(data)))
                  .catch(err=>{
                        console.log(err);
                        alert("Error");
                  })
            }
      }
}

const proceedRemoveFromCart = (product) => {
      return {
            type: actionTypes.REMOVE_PRODUCT_FROM_CART,
            productData:product
      }
}

export const syncCartWithDb = (cart, auth, savedForLater) => {
      return dispatch => {
            if(cart.length === 0){
                  dispatch(getCartFromDb(auth))
            }else {
                  //api call
                  console.log("syncCartWithDb in action",savedForLater);
                  
                  services.syncCart(cart, auth.token, savedForLater)
                  .then(res=>{
                        dispatch(getCartFromDb(auth))
                  })
                  .catch(err=>{
                        alert(err)
                  })
            }
      }
}

const getCartFromDb = (auth) => {
      return dispatch => {
            services.getCart(auth.token)
            .then( res=> {
                  if(res.status === 200)
                        dispatch(saveCartInStore(res.data))
            })
            .catch(err=> {
                  alert(err)
            })
      }
}

const saveCartInStore = (cart) => {
      return {
            type: actionTypes.SET_CART,
            cartData: cart
      }
}

exports.filterSearch = (e) => {
      console.log("in action dispatcegr")
      return {
            type: actionTypes.SEARCH_CART,
            searchKey : e.target.value
      }
}

export const updateCart = (data, auth) => {
      console.log("In update actions")
      return dispatch => {
            console.log(data, auth)
            if(!auth || auth.is_authenticated === false){
                  dispatch(proceedUpdateCart(data,"redux"))
            }else if(auth.is_authenticated === true) {
                  services.updateCart(data, auth.token)
                  .then(()=>dispatch(proceedUpdateCart(data,"server")))
                  .catch(err=>{
                        console.log(err);
                        alert("Error");
                  })
            }
      }
}

const proceedUpdateCart = (product,updatedIn) => {
      return {
            type: actionTypes.UPDATE_QUANTITY,
            updatedIn: updatedIn,
            productData:product
      }
}


export const addToSaveForLater = (data, auth) => {
      console.log("In addToSaveForLater actions")
      return dispatch => {
            console.log(data, auth)
            if(!auth || auth.is_authenticated === false){
                  dispatch(proceedAddToSaveForLater(data))
            }else if(auth.is_authenticated === true) {
                  services.addSaveForLaterItemToCart(data, auth.token)
                  .then(()=>dispatch(proceedAddToSaveForLater(data)))
                  .catch(err=>{
                        console.log(err);
                        alert("Error");
                  })
            }
      }
}

const proceedAddToSaveForLater = (product) => {
      return {
            type: actionTypes.ADDTO_SAVEFORLATER,
            productData:product
      }
}

export const removeFromSaveForLater = (data, auth) => {
      console.log("In removeFromSaveForLater actions")
      return dispatch => {
            console.log(data, auth)
            if(!auth || auth.is_authenticated === false){
                  dispatch(proceedremoveFromSaveForLater(data))
            }else if(auth.is_authenticated === true) {
                  services.removeSaveForLaterItemFromCart(data, auth.token)
                  .then(()=>dispatch(proceedremoveFromSaveForLater(data)))
                  .catch(err=>{
                        console.log(err);
                        alert("Error");
                  })
            }
      }
}

export const removeFromSaveForLaterAndAddToCart = (data, auth) => {
      console.log("In removeFromSaveForLater actions")
      return dispatch => {
            console.log(data, auth)
            if(!auth || auth.is_authenticated === false){
                  dispatch({type:actionTypes.REMOVEFROM_SAVEFORLATER_AND_ADDTOCART,productData:data})
            }else if(auth.is_authenticated === true) {
                  services.removeSaveForLaterItemAndAddToCart(data, auth.token)
                  .then(()=>dispatch({type:actionTypes.REMOVEFROM_SAVEFORLATER_AND_ADDTOCART,productData:data}))
                  .catch(err=>{
                        console.log(err);
                        alert("Error");
                  })
            }
      }
}

const proceedremoveFromSaveForLater = (product) => {
      return {
            type: actionTypes.REMOVEFROM_SAVEFORLATER,
            productData:product
      }
}

export const fetchAddressBook = (auth)=> {
      return dispatch => {
            services.getAddress(auth.token)
            .then(res=>{
                  if(res.status===200)
                  dispatch({type:actionTypes.SET_ADDRESS_BOOK, addressBook:res.data.address})
            })
            .catch(err=> {
                  console.log(err)
            })
      }
}

export const addToAddressBook = (auth, addressData)=> {
      return dispatch => {
            services.addToAddressBook(auth.token, addressData)
            .then(res=>{
                  if(res.status===201 || res.status ===200)
                  dispatch({type:actionTypes.ADD_ADDRESS, address:addressData})
            })
            .catch(err=> {
                  console.log(err)
            })
      }
}

export const selectDdress = (addressData)=> {
      return dispatch => {
            dispatch({type:actionTypes.SELECT_ADDRESS, address:addressData})
      }
}

export const placeOrder = (auth, orderData, selectedAddress)=> {
      return dispatch => {
            services.addOrder(auth.token, orderData, selectedAddress)
            .then(res=>{
                  console.log(res);
                  if(res.status===200){
                        dispatch({type:actionTypes.PLACE_ORDER, orderId:res.data.orderId})
                  } 
            })
            .catch(err=> {
                  console.log(err)
            })
      }
}

export const getOrders = (auth)=> {
      return dispatch => {
            services.getOrders(auth.token)
            .then(res=>{
                  console.log(res);
                  if(res.status===200){
                        dispatch({type:actionTypes.GET_MY_ORDERS, myOrders:res.data})
                  } 
            })
            .catch(err=> {
                  console.log(err)
            })
      }
}

export const deleteOrder = (auth, orderId, subOrderId)=> {
      return dispatch => {
            services.deleteOrder(auth.token, orderId, subOrderId)
            .then(res=>{
                  console.log("iiiiii",res);
                  if(res.status===200 && res.data.deleted){
                        dispatch({type:actionTypes.DELETE_ORDER, orderId:orderId, subOrderId})
                  } 
            })
            .catch(err=> {
                  console.log(err)
                  alert(err)
            })
      }
}

export const addProduct = (auth, product)=> {
      return dispatch => {
            services.addProduct(auth.token, product)
            .then(res=>{
                  console.log(res);
                  if(res.status===201){
                        dispatch({type:actionTypes.ADD_PRODUCT, productId:res.data.productId})
                  } 
            })
            .catch(err=> {
                  console.log(err)
            })
      }
}

export const resetProductId =()=>{
      return dispatch => {
      dispatch({type:actionTypes.RESET_PRODUCT_ID})
}
}

export const updateUser = (data) => {
      console.log("In update user action")
      return dispatch => {
            services.updateUser(data)
            .then(res=>{
                  console.log(res);
                  if(res.status===200){
                        alert("updated successfully")
                        dispatch({type:actionTypes.UPDATE_USER, userData:data})
                  } 
            })
            .catch(err=> {
                  console.log(err)
                  alert(err)
            })
      }
}