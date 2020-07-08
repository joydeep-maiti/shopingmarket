import React,{Component} from 'react';
import  shoppingImage from './shoppingImage.png';
import './Sidebar.css';
import { Link,withRouter } from 'react-router-dom';


class Sidebar extends Component{
   
   
 
    render()
    {
        return(
            <div class="side_nav">
            <Link to='/'><img src={ shoppingImage } alt="marketplace" /></Link> 
             <ul>
             <Link to="/admin/add_product" className="link"><li> <i class="fa fa-cube" aria-hidden="true"></i>&nbsp;&nbsp;Add Product</li></Link>
            
             <Link to="/admin/add_category" className="link"><li><i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp;&nbsp;Add Category</li></Link>
            <Link to="/admin/add_pramotion" className="link"> <li><i class="fa fa-bullhorn" aria-hidden="true"></i>&nbsp;&nbsp;Add Promotions</li></Link>
            
             </ul>
             </div>

        )
    }
}

export default withRouter(Sidebar);