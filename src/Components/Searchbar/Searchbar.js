import React, { Component } from 'react'
import './Searchbar.css'
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import Utilities from '../../Services/Utilities'
import services from '../../Utility/Services'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/products'
import { withRouter } from 'react-router-dom'
import { SET_CATEGORY } from '../../constants/products'

class Searchbar extends Component {

    state = {
        category:"all"
    }

    componentDidMount() {
        
        if(!this.props.location.pathname.includes("/products")) {
            console.log('this is products page')
            this.props.getproducts(this.state.category)
        }
        
    }

    onCategorySelect(category) {
        if(category !== this.state.category){
            this.setState({
                category
            })
            this.props.getproducts(category)
        }
    }

    onKeyPress(event) {
        if (event.key == 'Enter') {
            event.preventDefault();
        }
    }

    render() {
        return (

            <Form>
                <InputGroup>
                    <InputGroup.Prepend>
                        <Utilities category={this.props.category} onCategorySelect={(category)=>this.onCategorySelect(category)}/>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e)=>this.props.handleChange(e)}
                        onKeyPress={(e)=>this.onKeyPress(e)}
                        value={this.props.searchKey}
                    />
                    <Button><i className="fas fa-search"></i></Button>
                </InputGroup>
            </Form>




        )
    }
}

const mapStateToProps = (state) => {
    return {
        allProducts: state.productData,
        searchKey : state.searchKey,
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getproducts : (category)=>dispatch(actionCreators.getProducts(category)),
        handleChange : (e)=>dispatch(actionCreators.filterSearch(e)),
        // setCategory : (category)=>dispatch({type:SET_CATEGORY, category:category})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Searchbar));