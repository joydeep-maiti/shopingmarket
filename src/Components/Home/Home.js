import React from 'react';
import './Home.css'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Pramotions from '../Pramotions/Pramotions';
import Popular from '../Popular/Popular'
import Filters from '../Filters/Filters'
import ProductsCatalog from '../ProductsCatalog/ProductsCatalog'
import * as actionCreators from '../../actions/products'
import { SET_SORT } from '../../constants/products';

class Home extends React.Component{

    showingFilters(val) {
        console.log("SHOWING FILTER ", val)
        // this.setState({
        //     showingFilter :val
        // })
    }
    componentDidMount() {
        this.props.getproducts("all")
        this.props.setSort(null);
    }
    
    render(){
        return(
            <div className="homeDiv">
                <div>
                    <Filters />
                </div>
                <div className="homeContainer">
                    <Pramotions /> 
                    <ProductsCatalog showingFilters={(val)=> this.showingFilters(val)}/>
                    <Popular />
                </div>
            </div>
            

        )
    }

}
 

const mapStateToProps = (state) => {  
  return {
    searchKey : state.searchKey,
    category: state.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getproducts : (category)=>dispatch(actionCreators.getProducts(category)),
    setSort: (sort) => dispatch({ type:SET_SORT, sort})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));