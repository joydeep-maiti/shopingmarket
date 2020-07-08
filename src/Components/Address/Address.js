import React, { Component } from 'react';
import './Address.css';
import shoppingImage from './shoppingImage.png';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import AddressCard from './AddressCard/AddressCard'
import * as actionCreators from '../../actions/products'
import AddressForm from './AddressForm/AddressForm'
import { Button, Modal } from 'react-bootstrap'
import ConfirmOrder from '../OrderConfirm/OrderConfirm'
import { RESET_ORDER_ID } from '../../constants/products'

class Address extends Component {

    state = {
        showForm: false,
        showModal: false
    }

    componentDidMount() {
        if(!this.props.auth || this.props.auth.is_authenticated === false) {
            this.props.history.push('/signin')
            return
        }

        if((!this.props.addressBook || this.props.addressBook.length===0) && this.props.auth && this.props.auth.is_authenticated){

            this.props.fetchAddressBook(this.props.auth)
        }

    }

    componentWillReceiveProps = () => {
        console.log(this.props)
    }

    componentDidUpdate = () => {
        console.log("componentDidUpdate",this.props, this.state)
        if(this.props.orderId && this.props.orderId!==this.state.orderId) {
            this.setState({
                orderId: this.props.orderId,
                showModal: true
            })
        }
    }
    

    handleFormShow = () =>{
        console.log("Clicked")
        this.setState({
            showForm: true
        })
    }
    onAddAddress = (addressData) => {
        this.setState({
            showForm: false
        })
        this.props.addAddress(this.props.auth,addressData)
    }
    
    handleModalShow = () => {
        this.setState({
            showModal: !this.state.showModal
        })
        this.props.onBookingReset();
    }
    onHomeHandle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
        this.props.onBookingReset();
        this.props.history.push('/')
    }

    placeOrder = () => {
        this.props.onPlaceOrder( this.props.auth, this.props.product,this.props.selectedAddress );
    }

    render() {
        let showModal = false;

        return(
            <div className="addDiv">
               <Link to="/" ><img src={shoppingImage} alt="marketplace" /></Link>
                <div className="shippingDiv">
                    <h2>Select a shipping address </h2>
                    <p>Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button. Or you can <Link>enter a new shipping address</Link>. </p>
                </div>
                <div className="addressTray">
                    {this.props.addressBook?this.props.addressBook.map(el=> {
                        return <AddressCard address={el} selected={()=>this.props.onAddressSelect(el)}/>
                    }):""}
                    <AddressCard address={null} oncardClick={this.handleFormShow} />
                </div>
                {this.props.selectedAddress && <Button variant="warning" onClick={this.placeOrder}>Place Order</Button>}
                {this.state.showForm && <div className="addressFormDiv">
                    <AddressForm addAddress={(addressData)=>this.onAddAddress(addressData)}/>
                </div>}
                <Modal show={this.state.showModal || showModal} onHide={this.handleModalShow}>
                    <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body><ConfirmOrder orderId={this.state.orderId}/></Modal.Body>
                    <Modal.Footer>
                    <Button variant="warning" onClick={this.onHomeHandle}>
                        Home
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        orderId: state.orderId,
        product: state.cart,
        auth: state.auth,
        addressBook: state.addressBook,
        selectedAddress: state.selectedAddress
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAddressBook: (auth)=>dispatch(actionCreators.fetchAddressBook(auth)),
        addAddress: (auth,addressData)=>dispatch(actionCreators.addToAddressBook(auth,addressData)),
        onAddressSelect: (addressData)=>dispatch(actionCreators.selectDdress(addressData)),
        onPlaceOrder: (auth,order,selectedAddress)=>dispatch(actionCreators.placeOrder(auth,order,selectedAddress)),
        onBookingReset: ()=>dispatch({type:RESET_ORDER_ID})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Address));