import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Form, InputGroup, Col, Button } from 'react-bootstrap'
import './Signin.css';
import Logo from '../../asset/shoppingImage.png';
import service from '../../Utility/Services';
import Alert from '../Alert/Alert';

let initialState = {
    registered: sessionStorage.getItem('registered') || "",
    // firstLogin: sessionStorage.getItem("firstLogin") || false,
    validated: {
        email: true,
        password: true,
        phone: true
    },
    validation: true,
    formData: {
        email: "",
        password: "",
        phone: ""
    },
    showErr: false,
    forgotPassword: false
}

class Signin extends Component {

    state = initialState

    componentDidMount = () => {
        console.log("Signin props", this.props)
        if (sessionStorage.getItem('registered')) {
            this.setState({
                registered: sessionStorage.getItem('registered')
            })
            // sessionStorage.clear();
        }
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
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validation = true;
        let emailValid = true;
        let passValid = true;
        if (this.state.formData.email === "" || this.state.formData.email == undefined || !re.test(this.state.formData.email)) {
            validation = false;
            emailValid = false;
        }
        if (this.state.formData.password === "" || this.state.formData.password == undefined) {
            validation = false;
            passValid = false;
        }
        console.log(this.state);
        if (!validation) {
            this.setState({
                validated: {
                    password: passValid,
                    email: emailValid
                },
                validation: false
            })
            return
        }

        service.signIn(this.state.formData)
            .then(res => {
                let home = false;
                console.log("[LOGIN]", res);
                if (res.status === 200) {
                    if ((sessionStorage.getItem('registered')))
                        home = true
                    sessionStorage.clear();
                    this.setState({
                        forgotPassword: false
                    })
                    this.props.onAuth(res.data);
                    if (home)
                        this.props.history.push("/");
                    else
                        this.props.history.goBack();
                    // this.props.history.push("/");
                } else {
                    this.alertOpenHandler();
                }
            })
            .catch(err => {
                console.log(err);
                this.alertOpenHandler();
            })
    };

    alertOpenHandler = () => {
        this.setState({
            showErr: true
        })
    }

    alertCloseHandler = () => {
        this.setState({
            showErr: false
        })
    }

    forgotPassword = () => {
        sessionStorage.clear();
        this.setState({
            forgotPassword: true,
            registered: ""
        })
    }

    forgotPasswordSubmit = (event) => {
        // event.preventDefault();
        let validation = true;
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ((this.state.formData.email === "" || this.state.formData.email == undefined ||
            !re.test(this.state.formData.email)) &&
            (this.state.formData.phone === "" || this.state.formData.phone == undefined)) {
            validation = false
        }
        console.log("VVVVVVVVV", validation);

        if (!validation) {
            this.setState({
                validated: {
                    phone: false,
                    email: false
                },
                validation: false
            })
            return
        }



        service.forgotPassword(this.state.formData)
            .then(res => {
                if (res.status === 200) {
                    // this.setState(initialState);
                    this.setState({
                        forgotPassword: false
                    });
                } else {
                    this.alertOpenHandler();
                }
            })
            .catch(err => {
                console.log(err);
                this.alertOpenHandler();
            })

    }

    render() {

        return (
            <div>
                {/* <Alert show={this.state.showErr} variant={"danger"} msg={"Login Falied"} onClose={this.alertCloseHandler}/> */}
                <div className="logoImg" onClick={() => this.props.history.push("/")}>
                    <img src={Logo} />
                </div>
                {/* onSubmit={this.handleSubmit}  */}

                {this.state.registered &&
                    <div className="regDiv">
                        <div className="errMsg">
                            <h4 className="reg-title">Registered Successfully</h4>
                            <span>Enter the login credentials</span>
                        </div>
                    </div>}

                {this.state.showErr &&
                    <div className="errDiv">
                        <div className="errIcon"></div>
                        <div className="errMsg">
                            <h4 className="err-title">There was a problem</h4>
                            <span>Username or Paswword is incorrect.</span>
                        </div>
                    </div>}
                <div className="myDiv2">
                    <Form className="myformDiv">
                        {!this.state.forgotPassword && <div className="loginTitle">Login</div>}
                        {this.state.forgotPassword && <div className="loginTitle">Forgot Password</div>}

                        {!this.state.forgotPassword &&
                            <div>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationCustomUsername">
                                        <Form.Label>Email<sup>*</sup></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            required
                                            onChange={this.onChangeHandler}
                                            value={this.state.formData.email}
                                            style={{ border: this.state.validated.email ? "" : "1px solid red" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            *Please enter your email.
                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationCustom04">
                                        <Form.Label>Password <sup>*</sup></Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required
                                            onChange={this.onChangeHandler}
                                            value={this.state.formData.password}
                                            style={{ border: this.state.validated.password ? "" : "1px solid red" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            *Please enter your password.
                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Check
                                        style={{ display: "inline-block" }}
                                    />
                                    <label>Keep Me Signed In</label>
                                </Form.Group>
                                <button className="logInBtn" type="submit" onClick={this.handleSubmit}>Login</button>
                                <div className="createAccountDiv" onClick={() => this.forgotPassword()}><Link>Forgot Password?  Click here</Link></div>
                                <div className="createAccountDiv">Don't have an account? Create Account</div>

                            </div>
                        }

                        {this.state.forgotPassword &&
                            <div>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationCustomUsername">
                                        <Form.Label>Email<sup>*</sup></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Enter Email"
                                            onChange={this.onChangeHandler}
                                            value={this.state.formData.email}
                                            style={{ border: this.state.validated.email ? "" : "1px solid red" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            *Please enter your email.
                                         </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <div className="or-div">--- OR ---</div>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="validationCustom04">
                                        <Form.Label>Mobile <sup>*</sup></Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            placeholder="Mobile Number"
                                            minlength="10"
                                            maxlength="10"
                                            onChange={this.onChangeHandler}
                                            value={this.state.formData.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            *Please enter a valid mobile number.
                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>

                                <button className="logInBtn" type="submit" onClick={() => this.forgotPasswordSubmit()}>Submit</button>
                                <div className="mailmessage">You will receive your password in email once you submit your email or phone Number</div>
                            </div>
                        }
                    </Form>
                    {!this.state.forgotPassword &&
                        <div className="signupBtnDiv">
                            <Link to='/signup'><button className="signUpBtn">Sign up</button></Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Signin);