import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/products'
import { Input } from 'semantic-ui-react'

// import axios from 'axios';

// import Carousel from 'react-bootstrap/Carousel';
import { getOrders, deleteOrder, updateUser } from '../../actions/products';
import AddressCard from '../Address/AddressCard/AddressCard'
import ProfileImg from '../../asset/profile.png';
import './myProfile.css'
import AddressForm from '../Address/AddressForm/AddressForm'
import { Button, Modal } from 'react-bootstrap'

class MyProfile extends Component {

    state = {
        validated: {
            firstName: true,
            lastName: true,
            emailId: true,
            mobile: true,
            password: true
        },
        validation: true,
        formData: {
            firstName: this.props.auth.name || "",
            lastName: this.props.auth.lastName || "",
            emailId: this.props.auth.email || "",
            mobile: this.props.auth.mobile || "",
            password: this.props.auth.password || "",
            userId: this.props.auth.userId || ""
        },
        showErr: false,
        showErr2: false,
        showForm: false,
        showModal: false
    }

    UNSAFE_componentWillMount() {
        console.log("Aaaaaaaaaaaaaaaa", this.props);
        // this.props.getProductDetails(this.props.match.params.id);
    }
    componentDidMount() {
        if((!this.props.addressBook || this.props.addressBook.length===0) && this.props.auth && this.props.auth.is_authenticated){

            this.props.fetchAddressBook(this.props.auth)
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

    onChangeHandler = (event) => {
        if (event.target.value == "") {
            this.setState({
                validated: {
                    ...this.state.validated,
                    [event.target.name]: false
                },
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                },
                showErr: false
            })
        } else {
            this.setState({
                validated: {
                    ...this.state.validated,
                    [event.target.name]: true
                },
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                },
                showErr: false
            })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validation = true;
        let firstNameValid = true;
        // let lastNameValid = true;
        let emailIdValid = true;
        let mobileValid = true;
        let passValid = true;
        let cpassValid = true;
        if (this.state.formData.firstName === "" || this.state.formData.firstName == undefined) {
            validation = false;
            firstNameValid = false;
        }
        if (this.state.formData.emailId === "" || this.state.formData.emailId == undefined || !re.test(this.state.formData.emailId)) {
            validation = false;
            emailIdValid = false;
        }
        if (this.state.formData.mobile === "" || this.state.formData.mobile == undefined || this.state.formData.mobile.length < 10) {
            validation = false;
            mobileValid = false;
        }
        if (this.state.formData.password === "" || this.state.formData.password == undefined || this.state.formData.password.length < 5) {
            validation = false;
            passValid = false;
        }
        // if (this.state.formData.confirmPassword === "" || this.state.formData.confirmPassword == undefined || this.state.formData.confirmPassword !== this.state.formData.password) {
        //     validation = false;
        //     cpassValid = false;
        // }
        console.log(this.state);
        if (!validation) {
            this.setState({
                validated: {
                    firstName: firstNameValid,
                    emailId: emailIdValid,
                    mobile: mobileValid,
                    password: passValid
                },
                validation: false
            })
            return
        }
        else {
            console.log("everything is validated");
            this.props.updateUserData(this.state.formData)
        }
    };


    render() {
        console.log("!!!!!!!!!!!!!!!!!",this.state);
        
        return (
            <div class="profile-container">


                <div class="row">
                    <div class="col-sm-12 col-md-4 col-lg-4">

                        <img src={ProfileImg} className="profile-img"></img>

                        <div className="card name-card">
                            <h2 className="name">{this.props.auth.name} {this.props.auth.lastName}</h2>
                            <div className="email-1">{this.props.auth.email}</div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-8">
                        <div className="card name-card">
                            <h1 className="profile-title">Profile Details</h1>
                            {/* <hr /> */}

                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">Email ID</h3>
                                        <Input transparent className="data-value" placeholder='Search...' name="emailId" 
                                        value={this.state.formData.emailId} onChange={this.onChangeHandler} />
                                        
                                        {/* <div className="data-value">email@domain.com</div> */}
                                    </div>
                                    {!this.state.validated.emailId &&<div className="er-txt">Enter a valid Mail</div>}
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">Mobile</h3>
                                        <Input transparent className="data-value" placeholder='Search...' name="mobile" 
                                        value={this.state.formData.mobile} onChange={this.onChangeHandler} />
                                        
                                    </div>
                                    {!this.state.validated.mobile &&<div className="er-txt">Enter a valid Mobile Number</div>}
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">First Name</h3>
                                        <Input transparent className="data-value" placeholder='Search...' name="firstName" 
                                        value={this.state.formData.firstName} onChange={this.onChangeHandler} />
                                        
                                        {/* <div className="data-value">email@domain.com</div> */}
                                    </div>
                                    {!this.state.validated.firstName &&<div className="er-txt">Enter the First Name</div>}
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">Last Name</h3>
                                        <Input transparent className="data-value" placeholder='Search...' name="lastName"
                                        value={this.state.formData.lastName} onChange={()=>this.onChangeHandler(event)} />
                                    </div>
                                </div>
                            </div>


                            {/* <div class="row">
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">User Name</h3>
                                        <Input transparent className="data-value" placeholder='Search...' value="Sathish" />
                                        <div className="data-value">email@domain.com</div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">Role</h3>
                                        <Input transparent className="data-value" placeholder='Search...' value="Admin" />
                                    </div>
                                </div>
                            </div> */}

                            <h1 className="profile-title">Change Password</h1>
                            <div class="row">
                                <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    <div className="card data-card">
                                        <h3 className="label-name">Password</h3>
                                        <Input transparent className="data-value" placeholder='Search...' name="password"
                                        value={this.state.formData.password} onChange={this.onChangeHandler} />
                                        
                                    </div>
                                    {!this.state.validated.password &&<div className="er-txt">Enter must be atleast 6 digits</div>}
                                </div>
                                {/* {
                                    this.state.changePassword &&
                                    <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                        <div className="card data-card">
                                            <h3 className="label-name">Mobile</h3>
                                            <Input transparent className="data-value" placeholder='Search...' value="9876543211" />
                                        </div>
                                    </div>
                                } */}
                            </div>
                            <h1 className="profile-title">Address</h1>
                            <div class="row">
                                {/* <div class="col-12 col-sm-12 col-md-6 col-lg-6">
                                    
                                </div> */}

                                <div className="addressTray-1">
                                    {this.props.addressBook ? this.props.addressBook.map(el => {
                                        return <AddressCard address={el} selected={() => this.props.onAddressSelect(el)} />
                                    }) : ""}
                                    <AddressCard address={null} oncardClick={this.handleFormShow} />
                                </div>
                                {this.state.showForm && <div className="addressFormDiv2">
                                    <AddressForm addAddress={(addressData)=>this.onAddAddress(addressData)}/>
                                </div>}

                            </div>
                            <button className="saveChanges-btn" type="submit" onClick={this.handleSubmit}>Save Changes</button>
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
        auth: state.auth,
        myOrders: state.myOrders,
        addressBook: state.addressBook,
        selectedAddress: state.selectedAddress
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAddressBook: (auth)=>dispatch(actionCreators.fetchAddressBook(auth)),
        addAddress: (auth,addressData)=>dispatch(actionCreators.addToAddressBook(auth,addressData)),
        onAddressSelect: (addressData)=>dispatch(actionCreators.selectDdress(addressData)),
        updateUserData: (data)=>dispatch(actionCreators.updateUser(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(MyProfile))