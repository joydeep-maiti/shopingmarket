import React,{Component} from 'react';
import './Admin.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Adminnavbar from '../Adminnavbar/Adminnavbar';
import Addproduct from '../Addproduct/AddProduct.1';
import Addcategory from '../Addcategory/Addcategory';
import Addpramotion from '../Addpramotion/Addpramotion';
import { Switch, Route} from "react-router-dom";




class Admin extends Component{
  
    render()
    {

        return(
           <div>
               <Sidebar />
               <Adminnavbar />
               <div className="adminMain">
                   <Switch>
                      
                   <Route exact path="/admin/add_product"> <Addproduct /> </Route>
                   <Route exact path="/admin/add_category"> <Addcategory /> </Route>
                   <Route exact path="/admin/add_pramotion"> <Addpramotion /> </Route>
                   </Switch>
              

               </div>
           </div>

        )
    }
}

export default Admin;
