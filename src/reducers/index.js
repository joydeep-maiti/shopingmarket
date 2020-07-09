import * as actionTypes from '../constants/products'
import { GETPRODUCTS_SUCCESS, GETPRODUCTS_FAILED, ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, UPDATE_QUANTITY } from '../constants/products'

const initialState = {
    cart: []
};

const getProductsReducer = (state = initialState, action) => {
    const { type, productData, sort, message, cartData, searchKey, addressBook, address,
        orderId, myOrders, productId, category, userData } = action;

    switch (type) {
        case actionTypes.SET_AUTH:
            return {
                ...state,
                auth: action.data,
                addressBook: []
            }

        case GETPRODUCTS_SUCCESS:
            console.log("ALLPRODUCTS_SUCCESS in reducer", type, productData)
            return {
                ...state,
                productData,
                searchKey: "",
                filteredProducts: [],
                category
            }

        case GETPRODUCTS_FAILED:
            return {
                ...state,
                message
            }

        case ADD_PRODUCT_TO_CART:
            console.log("Add Products in reducer", action)
            let currentCart = state.cart
            if (currentCart) {
                currentCart.push({
                    productDetails: action.data,
                    qty: action.qty
                })
            } else {
                currentCart = [{
                    productDetails: action.data,
                    qty: action.qty
                }]
            }
            return {
                ...state,
                cart: [...currentCart]
            }
        case REMOVE_PRODUCT_FROM_CART:
            console.log("in remove frpm cart")
            let newCart = state.cart;
            var i = newCart.length;
            while (i--) {
                // console.log("ooooo", newCart[i].productDetails, action);
                if (newCart[i].productDetails.id === productData.productDetails.id) {
                    newCart.splice(i, 1);
                }

            }
            // console.log("REMOVE Products in reducer", newCart)
            return {
                ...state,
                cart: [
                    ...newCart
                ]
            }

        case UPDATE_QUANTITY:
            console.log("bcd", action)
            let newCart1 = state.cart;
            newCart1.forEach((product) => {
                if (product.productDetails.id == action.productData.id) {
                    product.qty = Number(action.productData.quantity);
                }

            })
            return {
                ...state,
                cart: [
                    ...newCart1
                ]
            }

        case actionTypes.SET_CART:
            console.log("Setting Cart")
            return {
                ...state,
                cart: cartData.currentItems ? [...cartData.currentItems] : [],
                savedForLater: cartData.savedForLaterItems
            }

        case actionTypes.RESET_CART:
            console.log("Setting Cart")
            return {
                ...state,
                cart: [],
                savedForLater: []
            }

        case actionTypes.SEARCH_CART:
            let filteredProducts = []
            if (searchKey === "") {
                return {
                    ...state,
                    filteredProducts: [],
                    searchKey
                }
            }
            state.productData.map(el => {
                // console.log(el.id, el.title)
                if (el.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())) {
                    filteredProducts.push(el);
                }
                else if (el.shortDescription.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())) {
                    filteredProducts.push(el);
                }
            })
            return {
                ...state,
                filteredProducts,
                searchKey
            }

        case actionTypes.ADDTO_SAVEFORLATER:
            console.log("ADDTO_SAVEFORLATER reducer", state)

            let newSavedForLater = [];
            if (state.savedForLater)
                newSavedForLater = state.savedForLater;

            let newCart2 = state.cart;
            let directSaveForLater = true;
            var i = newCart2.length;
            while (i--) {
                // console.log("ooooo", newCart[i].productDetails, action);
                if (newCart2[i].productDetails.id === productData.productDetails.id) {
                    directSaveForLater = false;
                    newSavedForLater.push(newCart2[i]);
                    newCart2.splice(i, 1);
                }

            }
            if (directSaveForLater)
                newSavedForLater.push(productData);
            return {
                ...state,
                cart: [
                    ...newCart2,
                ],
                savedForLater: [
                    ...newSavedForLater
                ]
            }

        case actionTypes.REMOVEFROM_SAVEFORLATER:
            console.log("REMOVEFROM_SAVEFORLATER reducer")
            let newSavedForLater2 = state.savedForLater;
            var i = newSavedForLater2.length;
            while (i--) {
                if (newSavedForLater2[i].productDetails.id === productData.productDetails.id) {
                    newSavedForLater2.splice(i, 1);
                }
            }
            return {
                ...state,
                savedForLater: [
                    ...newSavedForLater2
                ]
            }

        case actionTypes.REMOVEFROM_SAVEFORLATER_AND_ADDTOCART:
            console.log("REMOVEFROM_SAVEFORLATER_AND_ADDTOCART reducer")
            let newCart3 = state.cart;
            let newSavedForLater1 = state.savedForLater;
            var i = newSavedForLater1.length;
            while (i--) {
                if (newSavedForLater1[i].productDetails.id === productData.productDetails.id) {
                    newCart3.push(newSavedForLater1[i]);
                    newSavedForLater1.splice(i, 1);
                }

            }
            return {
                ...state,
                cart: [
                    ...newCart3,
                ],
                savedForLater: [
                    ...newSavedForLater1
                ]
            }

        case actionTypes.SET_ADDRESS_BOOK:
            console.log("Setting ADDRESS_BOOK")
            let length = addressBook.length
            let selAddr = null
            addressBook.map((el, i) => {
                if (i === length - 1) {
                    el.selected = true;
                    selAddr = el
                }
            })
            return {
                ...state,
                addressBook,
                selectedAddress: selAddr
            }

        case actionTypes.ADD_ADDRESS:
            console.log("Adding ADDRESS_BOOK")

            let addr = state.addressBook;
            selAddr = null
            if (addr) {

                addr.map(el => {
                    if (el === address) {
                        el.selected = true
                        selAddr = el
                    } else {
                        el.selected = false
                    }
                })
            } else {
                addr = []
            }
            addr.push({
                ...address,
                selected: true
            })
            return {
                ...state,
                addressBook: [
                    ...addr
                ],
                selectedAddress: address
            }

        case actionTypes.SELECT_ADDRESS:
            console.log("SELECTING ADDRESS_BOOK")
            addr = state.addressBook;
            addr.map(el => {
                if (el === address) {
                    el.selected = true
                } else {
                    el.selected = false
                }
            })
            console.log(addr)
            return {
                ...state,
                addressBook: [
                    ...addr
                ],
                selectedAddress: address
            }

        case actionTypes.PLACE_ORDER:
            console.log("ORderID reducer", orderId)
            return {
                ...state,
                cart: [],
                orderId: orderId
            }
        case actionTypes.RESET_ORDER_ID:
            console.log("ORderID", orderId)
            return {
                ...state,
                orderId: undefined,
                selectedAddress: undefined
            }

        case actionTypes.GET_MY_ORDERS:
            console.log("GET ORders reducer", myOrders)
            return {
                ...state,
                myOrders: myOrders
            }

        case actionTypes.DELETE_ORDER:
            console.log("Delete ORders reducer", orderId, action.subOrderId)
            var newMyOrders = state.myOrders
            var i2 = newMyOrders.length;
            while (i2--) {
                if (newMyOrders[i2].orderId === orderId) {
                    if (action.subOrderId) {
                        let newOrder = newMyOrders[i2].order.filter((ord) => ord.subOrderId !== action.subOrderId);
                        if (newOrder.length === 0)
                            newMyOrders.splice(i2, 1);
                        else
                            newMyOrders[i2].order = [...newOrder];
                    } else {
                        newMyOrders.splice(i2, 1);
                    }

                }
            }
            return {
                ...state,
                myOrders: [
                    ...newMyOrders
                ]
            }

        case actionTypes.ADD_PRODUCT:
            console.log("ADD_PRODUCT reducer")
            return {
                ...state,
                productId: productId
            }

        case actionTypes.RESET_PRODUCT_ID:
            console.log("RESET_PRODUCT_ID reducer")
            return {
                ...state,
                productId: undefined
            }
        case actionTypes.SET_SORT:
            return {
                ...state,
                sort
            }
        case actionTypes.UPDATE_USER:
            let updatedUser = state.auth
            updatedUser.name = userData.firstName;
            updatedUser.lastName = userData.lastName;
            updatedUser.email = userData.emailId;
            updatedUser.mobile = userData.mobile;
            updatedUser.password = userData.password;
            return {
                ...state,
                auth: updatedUser
            }
        default:
            return state
    }
}
export default getProductsReducer;