import axios from 'axios';

exports.signIn = (data) => {
    // return axios.post("http://localhost:5000/login", data)
    return axios.post("https://shopingmarketapi.herokuapp.com/login", data)
}

exports.signupService = (bodyData) => {
    return axios({
      method: 'post',
      url: 'https://shopingmarketapi.herokuapp.com/user/signup',
      data: {
        emailId: bodyData.emailId,
        firstName: bodyData.firstName,
        lastName: bodyData.lastName,
        mobileNumber: bodyData.mobile,
        password: bodyData.password
      },
      headers: { 'Content-Type': 'application/json' }
    })
  }

  exports.forgotPassword=(data)=>{
    return axios.post("https://shopingmarketapi.herokuapp.com/login/forgotpassword", data)
  }

  exports.updateUser = (data) => {
    return axios.post(`https://shopingmarketapi.herokuapp.com/user/${data.userId}`, data)
}

exports.getCart = (token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    return axios.get("https://shopingmarketapi.herokuapp.com/cart", config)
}

exports.addItemToCart = (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        currentItem: data
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/add", params, config)
}

exports.addSaveForLaterItemToCart = (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        savedForLaterItem: data
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/add", params, config)
}

exports.removeItemFromCart = (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        currentItem: data
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/delete", params, config)
}

exports.removeSaveForLaterItemFromCart = (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        savedForLaterItem: data
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/delete", params, config)
}

exports.removeSaveForLaterItemAndAddToCart = (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        saveforLaterToCurrent: data
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/delete", params, config)
}

exports.syncCart = (data, token, savedForLater) => {
    console.log("services",savedForLater);
    
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        cart: {
            currentItems: data,
            savedForLaterItems: savedForLater
        }
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/sync", params, config)
}

exports.updateCart = (data, token) => {
    console.log("in servicesssss",data);
    
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        "productId": data.id,
        "qty": Number(data.quantity)
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/cart/update", params, config)
}

exports.getAddress = (token)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    return axios.get("https://shopingmarketapi.herokuapp.com/address", config)
}

exports.addToAddressBook = (token,addressData)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }

    let params = {
        "address": addressData,
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/address",params, config)
}

exports.addOrder = (token, orderData, selectedAddress)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        order: orderData,
        address:selectedAddress
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/order", params, config)
}

exports.getOrders = (token)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    return axios.get("https://shopingmarketapi.herokuapp.com/order", config)
}

exports.deleteOrder = (token, orderId, subOrderId)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        orderId,
        subOrderId
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/order/delete", params, config)
}

exports.addProduct = (token, product)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        product
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/products", params, config)
}

exports.addCategory = (token, category)=> {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    let params = {
        categoryName: category
    }
    return axios.post("https://shopingmarketapi.herokuapp.com/category", params, config)
}