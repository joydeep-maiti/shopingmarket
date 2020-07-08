import React,{Component} from 'react';
import './Adminnavbar.css';
import { connect } from 'react-redux';

class Adminnavbar extends Component{
    render()
    {
        console.log("sf",this.props);
        return(
            <div class="adminNavbar">
            <ul>
        <li><i class="fa fa-user-circle-o"></i>{this.props.auth.name}</li>
            </ul>
          </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,null)(Adminnavbar);