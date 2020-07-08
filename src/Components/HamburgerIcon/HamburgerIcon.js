import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './HamburgerIcon.css'

class HamburgerIcon extends Component{
    constructor(props){
        super(props)
        this.state={
          showMenu: false
          
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        
    }

    showMenu(event) {
      event.preventDefault();
      
      this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
      });
      
    }
    
    closeMenu() {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }

    
    
    
    

    

    render(){
        return(
            <div className="container1">
            <div className="hamburgerIcon" onClick={this.showMenu}>
              <i className="fas fa-bars fa-2x" ></i> 
            </div>
            {
          this.state.showMenu
            ? (
            <div className={`itemsContainer  ${this.state.showMenu?'show':'hide'}`}  >
                <ul className="menuItem">
                    <li className="menuList">
                      {!this.props.name && <Link to="/signin" className="menuLink">
                        <button className="signInBtn">Sign in</button>
                      </Link>}
                      {this.props.name && <div className="menuLink"><button className="signInBtn" onClick={this.props.onSignout}>Sign out</button></div>}
                    </li>
                    <li className="menuList"><Link to="/home" className="menuLink">Home</Link></li>
                    <li className="menuList"><Link to="/aboutus" className="menuLink">About us</Link></li>
                    <li className="menuList"><Link to="/contactus" className="menuLink">Contact us</Link></li>
                    <li className="menuList"><Link to="/myOrders" className="menuLink">My Orders</Link></li>
                    {this.props.auth &&<li className="menuList"><Link to="/profile" className="menuLink">My Profile</Link></li>}
                    {this.props.auth && this.props.auth.role && this.props.auth.role==="admin" && <li className="menuList"><Link to="/admin/add_product" className="menuLink">Admin</Link></li>}

                </ul>
            </div>
            ):
            (
              null
            )
        }
            </div>        
    )
    }
    
}
export default HamburgerIcon