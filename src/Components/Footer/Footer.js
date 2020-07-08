import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Link } from 'react-router-dom';
import  shoppingImage from './shoppingImage.png';



const Footer = () => {
  return (
    <div className="page-footer">
      <table>
        <tr>
          <th></th>
          <th>About us</th>
          <th></th>
          <th>Contact</th>
          <th></th>
          <th>Visit</th>
        </tr>
        <tr>
          <td></td>
          <td>Small Marketplace is a Online
             Shopping Application</td>
          <td></td>
          <td>Mobile No:<strong> +91 1234567891</strong><br></br> Email id: <strong><a href="mailto:marketplacepoc446@gmail.com">marketplacepoc446@gmail.com</a></strong></td>
          <td></td>
          <td>Small Marketplace,100 street
             road,Bangalore,Karnataka-123456</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <hr></hr>
      <Link className="footer-link" to="/conditions"> <strong>Conditions of Use</strong> </Link>
      <Link className="footer-link" to="/privacy"><strong> Privacy Notice</strong></Link>
      <Link className="footer-link" to="/interestbasedads"><strong>Interest-Based Ads</strong></Link>
      
      <Link className="footer-link-rights" to="/smallshop">&nbsp;<strong>© 2020, Smallshop.com, Inc. or its affiliates</strong></Link>
    </div>
 
  )
}

export default Footer;
