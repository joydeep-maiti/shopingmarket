import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './SignInBox.css';


class SigninBox extends Component {

    state = {
        showSigninContainer : false
    }

    displayContainer = () => {
        this.setState({
            showSigninContainer : true
        })
    }

    hideContainer = () => {
        this.setState({
            showSigninContainer : false
        })
    }

    onSigninClickHandler = () => {
        this.props.history.push("/signin")
    }

    onSignOutClickHandler = () => {
        this.props.onSignout();
    }

    render(){
        let container = this.state.showSigninContainer?(
                <div className="signInBtnContainer">
                    <div className="signInBtnDiv">
                        {!this.props.name && <button className="signInBtn" onClick={this.onSigninClickHandler}>Sign in</button>}
                        {this.props.name && <button className="signInBtn" onClick={this.onSignOutClickHandler}>Sign out</button>}
                    </div>
                </div>
        ):""

        return (
            <div className="signInBox" onMouseEnter={this.displayContainer} onMouseLeave={this.hideContainer}>
                Hello {this.props.name?this.props.name:"Guest"}
                {container}
            </div>
        )
    } 
}

export default withRouter(SigninBox);