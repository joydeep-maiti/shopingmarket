import React, { Component } from 'react';
import './Addcategory.css';
import { Form, Button, Row, Col, Modal,Card,ListGroup,ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as services from '../../Utility/Services';
import axios from 'axios';

const initialState = {
    categoryName: "",
    show: false,
    categorienames: [],
}

class Addcategory extends Component {
    state = initialState;

    componentDidMount() {
       this.categoryList();
    }
    categoryList=  ()=>{
        axios.get(`https://marketplace--server.herokuapp.com/category`).then((response) => {
            this.setState({ categorienames: response.data.data });
        })
    }
    
    handleCategory = () => {
        this.setState({
            [event.target.name]: event.target.value

        });
    }
    onAddcategory = (event) => {
        event.preventDefault();
        services.addCategory(this.props.auth, this.state.categoryName.toLowerCase()).then((res)=>{
            console.log("eeeeeeee",res.data);
            
            if(res.status === 201){
                this.setState({show: true})
                this.categoryList();
            }
        })
    }

    handleModalShow=()=>{
        this.setState({show: false});
    }

    render() {

        return (
            <div className="addCategoryDiv">
                <h1>Add Category</h1>
                <Form className="addCategoryForm" onSubmit={this.onAddcategory}>
                    <Form.Group as={Row} controlId="productForm">
                        <Form.Label column sm={2}>Category<sup style={{color:'red'}}>*</sup></Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" className="categoryControl" name="categoryName" value={this.state.categoryName} onChange={this.handleCategory} required />
                        </Col>
                    </Form.Group>
                    <Button variant="success" type="submit" >
                        Add Category
               </Button>
                </Form>
                <h4 style={{color:'#b06125',textAlign:'left'}}>Available Categories</h4>
                <div className="availableCate">
               {this.state.categorienames.slice(1).map((item,i) =>
                 <Card  >
                 <Card.Body >
                 <h6 className="displayCat">{item.categoryName.replace(/^./,item.categoryName[0].toUpperCase())}</h6>
                 </Card.Body> 
               </Card>
                )
                } 
             
               </div>

                <Modal show={this.state.show} onHide={this.handleModalShow}>
                    <Modal.Header closeButton>
                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                    </Modal.Header>
                    <Modal.Body>
                        <div className="orderConfmDiv">
                            <div className="tickDiv">
                                <div className="tickDiv1"></div>
                                <div className="tickDiv2"></div>
                            </div>
                            <div className="orderInfoDiv">
                                Category is created Successfully!
                            </div>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="warning" onClick={this.onHomeHandle}>
                            Home
                    </Button>
                    </Modal.Footer> */}
                </Modal>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        auth: state.aut
    }
}

export default connect(mapStateToProps,null)(withRouter(Addcategory))
