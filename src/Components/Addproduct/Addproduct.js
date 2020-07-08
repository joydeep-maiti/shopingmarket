import React, { Component } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import './Addproduct.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addProduct, resetProductId } from '../../actions/products';
import { storageRef } from '../../firebaseConfig'


const initialState = {
    category: "men's fashion",
    title: "",
    price: "",
    brand: "",
    keywords: "",
    description: "",
    thumbnail: "",
    filename: "",
    showBrand: true,
    categorienames: [],
    showModal: false,
    productId: "s"
}


class Addproduct extends Component {
    state = initialState;
    componentDidMount() {
        axios.get(`https://marketplace--server.herokuapp.com/category`).then((response) => {
            this.setState({ categorienames: response.data.data });
        })
    }
    componentDidUpdate = () => {
        console.log("componentDidUpdate",this.props, this.state)
        if(this.props.productId && this.props.productId!==this.state.productId) {
            this.setState({
                productId: this.props.productId,
                showModal: true
            })
        }
    }

    handleProduct = () => {
        if (event.target.value === "Books") {
            this.setState({
                showBrand: false,
            })
        }
        else if (event.target.value !== "Books") {
            this.setState({
                showBrand: true,
            })

        }
        this.setState({
            [event.target.name]: event.target.value

        });


    }
    onAddproduct = (event) => {
        event.preventDefault();
        this.props.addProduct(this.props.auth, {
            category: this.state.category, title: this.state.title,
            price: this.state.price, brand: this.state.brand, keywords: this.state.keywords, shortDescription: this.state.description,
            thumbnailUrl: this.state.thumbnail
        })
    }

    onHomeHandle = () => {
        this.setState({
            showModal: false
        })
        this.props.resetProductId();
        this.props.history.push('/')
    }

    handleModalShow = () => {
        // this.setState({
        //     showModal: !this.state.showModal
        // })
        this.setState(initialState);
        this.props.resetProductId();
    }

    handleUpload = (e) => {
        this.setState({
            showUploadedErr:false,
            showUploaded:false
        })
        let file = e.target.files[0];
        console.log("---File data", file, Date.now())
        if(!file.type.includes("image")){
            alert("Unsupported file format. Please choose a image")
            return;
        }
        let filename = Date.now()+file.name;
        var docref = storageRef.child('images/'+filename);
        const self = this;
        docref.put(file)
        .then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            self.setState({
                showUploaded:true,
                showUploadedErr:false,
                thumbnail:"https://storage.googleapis.com/marketplace-a3727.appspot.com/images/"+filename
            })
        })
        .catch(err=> {
            self.setState({
                showUploadedErr:true,
                showUploaded:false
            })
        });
    }

    render() {
        if (this.state.showBrand === true) {
            var brand = <Form.Group as={Row} controlId="productForm" >
                <Form.Label column sm={2}>Brand</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" name="brand" className="productControl" value={this.state.brand} onChange={this.handleProduct} />
                </Col>
            </Form.Group>
        }
        else {
            var author = <Form.Group as={Row} controlId="productForm">
                <Form.Label column sm={2}>Author</Form.Label>
                <Col sm={10}>
                    <Form.Control type="text" name="author" className="productControl" value={this.state.author} onChange={this.handleProduct} />
                </Col>
            </Form.Group>
        }
        return (
            <div className="addProductDiv">
                <h1>Add Product Details</h1>
                <Form className="addProductForm" onSubmit={this.onAddproduct}>
                    <Form.Group as={Row} controlId="productForm">
                        <Form.Label column sm={2}>Category<sup style={{color:'red'}}>*</sup></Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" className="productControl" name="category" value={this.state.category} onChange={(e) => this.handleProduct()} required>
                                {this.state.categorienames.slice(1).map((item) =>
                                    <option value={item.categoryName}>{item.categoryName}</option>)
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="productForm">
                        <Form.Label column sm={2}>Title<sup style={{color:'red'}}>*</sup></Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="title" className="productControl" value={this.state.title} onChange={this.handleProduct} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="productForm">
                        <Form.Label column sm={2}>Price<sup style={{color:'red'}}>*</sup></Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" name="price" className="productControl" value={this.state.price} onChange={this.handleProduct} required />
                        </Col>
                    </Form.Group>
                    {brand}
                    {author}
                    <Form.Group as={Row} controlId="productFrom">
                        <Form.Label column sm={2}>Keywords</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="keywords" className="productControl" value={this.state.keywords} onChange={this.handleProduct} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="productFrom">
                        <Form.Label column sm={2} className="label">Short Description<sup style={{color:'red'}}>*</sup></Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" rows="3" name="description" className="productControl" value={this.state.description} onChange={this.handleProduct} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="productFrom">
                        <Form.Label column sm={2} className="label">Thumbnail Url<sup style={{color:'red'}}>*</sup></Form.Label>
                        <Col sm={10}>
                            <Form.Control type="url" name="thumbnail" className="productControl" value={this.state.thumbnail} onChange={this.handleProduct} required />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="productFrom">
                        <Form.Label column sm={2} className="label">Upload Image</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="file" name="thumbnail" className="productControl" onChange={this.handleUpload} required />
                            {this.state.showUploaded && <span className="productControl uploadFeedback">UPLOADED</span>}
                            {this.state.showUploadedErr && <span className="productControl uploadFeedbackErr">UPLOAD FALED</span>}
                        </Col>
                    </Form.Group>
                    <Button variant="success" type="submit" >
                        ADD Product
            </Button>
                </Form>

                <Modal show={this.state.showModal} onHide={this.handleModalShow}>
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
                                Product is created Successfully!
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={this.onHomeHandle}>
                            Home
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        auth: state.auth,
        productId: state.productId
    }
}

export default connect(mapStateToProps, { addProduct, resetProductId })(withRouter(Addproduct))

