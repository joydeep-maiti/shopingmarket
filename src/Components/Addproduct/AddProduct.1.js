import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import { Button, Icon, Input, Dropdown, Accordion, Checkbox } from 'semantic-ui-react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { storageRef } from '../../firebaseConfig';
import './productCards.css';
import cam from '../../asset/cam.jpg';

import axios from 'axios';
import { addProduct, resetProductId } from '../../actions/products';

const initialState = {
    category: "electronics",
    title: "",
    price: "",
    brand: "",
    keywords: "",
    description: "",
    thumbnail: "",
    showBrand: true,
    categorienames: [],
    showModal: false,
    productId: "s",
    modified: false,
    activeIndex: 0,
    pic1: '',
    pic2: '',
    pic3: '',
    pic4: '',
    pic5: '',
    mrp: 0,
    manufactureCost: 0,
    inventoryQty: 0,
    manufacturer: '',
    showUploadedErr: false,
    showUploaded: false
}

export class AddProduct extends Component {
    state = initialState;
    componentDidMount() {
        axios.get(`https://marketplace--server.herokuapp.com/category`).then((response) => {
            this.setState({ categorienames: response.data.data });
        })
    }
    componentDidUpdate = () => {
        console.log("componentDidUpdate", this.props, this.state)
        if (this.props.productId && this.props.productId !== this.state.productId) {
            this.setState({
                productId: this.props.productId,
                showModal: true
            })
        }
    }

    handleProduct = () => {
        console.log("hppppp", event.target);

        if (event.target.value === "Books") {
            this.setState({
                showBrand: false,
            })
        }
        else if (event.target.value != "Books") {
            this.setState({
                showBrand: true,
            })

        }
        this.setState({
            [event.target.name]: event.target.value,
            modified: true
        });


    }
    onAddproduct = (event) => {
        // event.preventDefault();
        this.setState({
            showModal: true
        })

        var output = document.getElementById('pic1');
        output.src = cam;

        this.props.addProduct(this.props.auth, {
            category: this.state.category, title: this.state.title,
            price: this.state.price, brand: this.state.brand, keywords: this.state.keywords,
            shortDescription: this.state.description,
            thumbnailUrl: this.state.thumbnail,
            mrp: this.state.mrp,
            manufactureCost: this.state.manufactureCost,
            inventoryQty: this.state.inventoryQty,
            manufacturer: this.state.manufacturer
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

    setCategory = (event, { value }) => {
        console.log("innnn", value);
        this.setState({ category: value, modified: true })
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    preview_image = (event, img) => {
        this.setState({ modified: true })
        var reader = new FileReader();
        reader.onload = function () {
            var output = document.getElementById(img);
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        if (img === "pic1")
            this.setState({ pic1: event.target.files[0] })
        if (img === "pic2")
            this.setState({ pic2: event.target.files[0] })
        if (img === "pic3")
            this.setState({ pic3: event.target.files[0] })
        if (img === "pic4")
            this.setState({ pic4: event.target.files[0] })
        if (img === "pic5")
            this.setState({ pic5: event.target.files[0] })
    }

    remove_image = (img) => {
        console.log("in remove img");

        var output = document.getElementById(img);
        output.src = cam;

        if (img === "pic1")
            this.setState({ pic1: null })
        if (img === "pic2")
            this.setState({ pic2: null })
        if (img === "pic3")
            this.setState({ pic3: null })
        if (img === "pic4")
            this.setState({ pic4: null })
        if (img === "pic5")
            this.setState({ pic5: null })
    }


    handleUpload = () => {
        this.setState({
            showUploadedErr: false,
            showUploaded: false
        })
        if (!this.state.pic1) {
            alert("Please choose a image")
            return;
        }

        let file = this.state.pic1;
        console.log("---File data", file, Date.now())
        if (!file.type.includes("image")) {
            alert("Unsupported file format. Please choose a image")
            return;
        }
        let filename = Date.now() + file.name;
        var docref = storageRef.child('images/' + filename);
        const self = this;
        docref.put(file)
            .then(function (snapshot) {
                console.log('Uploaded a blob or file!');
                self.setState({
                    showUploaded: true,
                    showUploadedErr: false,
                    thumbnail: "https://storage.googleapis.com/marketplace-a3727.appspot.com/images/" + filename
                })
            })
            .catch(err => {
                self.setState({
                    showUploadedErr: true,
                    showUploaded: false
                })
            });
    }

    handleChange = (e, { checked }) => {
        console.log("ccccccc",e.target.id,checked);
        
        // this.log('Change', checked)
        // this.toggle()
      }

    // submit = () => {
    //     this.setState({ modified: false })

    //     const reqBody = {}
    //     reqBody.productName = document.getElementById("productName").value
    //     reqBody.description = document.getElementById("description").value
    //     reqBody.gender = this.state.gender
    //     reqBody.category = this.state.category
    //     reqBody.sleeveType = this.state.sleeveType
    //     reqBody.neckType = this.state.neckType
    //     reqBody.manufacturer = document.getElementById("manufacturer").value
    //     reqBody.salesPrice = document.getElementById("salesPrice").value
    //     reqBody.MRP = document.getElementById("mrp").value
    //     reqBody.manufactureCost = document.getElementById("manufactureCost").value
    //     reqBody.quantity = document.getElementById("quantity").value
    //     // reqBody.image1 = fileData;
    //     // reqBody.image2 = this.state.pic2;
    //     // reqBody.image3 = this.state.pic3;
    //     // reqBody.image4 = this.state.pic4;
    //     // reqBody.image5 = this.state.pic5;
    //     console.log("reqbody", reqBody);

    //     const fileData = new window.FormData();
    //     fileData.append('file1', this.state.pic1);
    //     fileData.append('file2', this.state.pic2);
    //     fileData.append('file3', this.state.pic3);
    //     fileData.append('file4', this.state.pic4);
    //     fileData.append('file5', this.state.pic5);
    //     fileData.append('data', JSON.stringify(reqBody));

    //     this.props.addProduct(fileData);
    // }
    render() {
        // console.log("aaaa", this.state.modified);

        let validated = true;

        if (this.state.title !== '' && this.state.description !== '' && this.state.price !== '' && this.state.thumbnail !== ''
            && this.state.category !== '')
            validated = false

        const { activeIndex } = this.state;
        let key = 0, text = '', value = '';

        var categoryOptions = this.state.categorienames.map((item, index) => {
            return { key: index + 1, text: item.categoryName, value: item.categoryName }
        })

        return (
            <div>
                <Accordion styled className="acc">
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Image <sup style={{ color: 'red' }}>*</sup>
                </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div className="flexFooter">

                            <div className="d-flex flex-row">
                                <div className="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top addimg' id="pic1" src={cam} alt="products"></img>

                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic1) ?
                                                            <input type="file" className="inputImgStyle" name="img1" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic1")} />
                                                            :
                                                            <button onClick={() => this.remove_image("pic1")}>Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top addimg' id="pic2" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic2) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic2")} />
                                                            :
                                                            <button onClick={() => this.remove_image("pic2")}>Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top addimg' id="pic3" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic3) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic3")} />
                                                            :
                                                            <button onClick={() => this.remove_image("pic3")}>Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize">

                                            <div className="card-body">
                                                <img className='card-img-top addimg' id="pic4" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic4) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic4")} />
                                                            :
                                                            <button onClick={() => this.remove_image("pic4")}>Remove</button>
                                                    }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="p-2">
                                    <div className="d-flex justify-content-between">

                                        <div className="card cardBoxSize" >

                                            <div className="card-body">
                                                <img className='card-img-top addimg' id="pic5" src={cam} alt="products"></img>
                                                <div style={{ "textAlign": "center" }}>
                                                    {
                                                        (!this.state.pic5) ?
                                                            <input type="file" className="inputImgStyle" accept="image/*" size="10" onChange={(event) => this.preview_image(event, "pic5")} />
                                                            :
                                                            <button onClick={() => this.remove_image("pic5")}>Remove</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.pic1 &&
                            <div className="upload-div">
                                {!this.state.showUploaded && <button className="btn btn-primary upload-button" onClick={() => this.handleUpload()}>Upload Image</button>}
                            </div>}

                        {this.state.showUploaded && <span className="productControl uploadFeedback">UPLOADED SUCCESSFULLY</span>}
                        {this.state.showUploadedErr && <span className="productControl uploadFeedbackErr">UPLOAD FALED</span>}

                        {!this.state.pic1 &&
                            <div className="imgUrl-div">
                                <label className="label-img">Image Url</label>
                                <input type="url" name="thumbnail" className="urlInput" value={this.state.thumbnail} onChange={this.handleProduct} required />
                            </div>
                        }
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Info <sup style={{ color: 'red' }}>*</sup>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <div className="AddProduct-field">
                            <label className="label-field">Product Name<sup style={{ color: 'red' }}>*</sup></label>
                            <Input type="text" id="title" name="title" autoFocus placeholder="Enter productName." value={this.state.title} onChange={this.handleProduct} />
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">Description<sup style={{ color: 'red' }}>*</sup></label>
                            <textarea id="description" name="description" rows="3" cols="40" placeholder="Enter Description" value={this.state.description} onChange={this.handleProduct} />
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Product Types <sup style={{ color: 'red' }}>*</sup>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>

                        <div className="AddProduct-field">
                            <label className="label-field">Category<sup style={{ color: 'red' }}>*</sup></label>
                            <Dropdown placeholder='category' id="category" name="category" selection={true} options={categoryOptions} onChange={this.setCategory} />
                            <label className="label-field">Sub-Category</label>
                            <Dropdown placeholder='sub-category' id="sub-category" name="sub-category" selection={true} options={categoryOptions} value={this.state.category} onChange={this.setCategory} />
                        </div>

                        {this.state.category !== "books" &&
                            <div className="AddProduct-field">
                                <label className="label-field">Brand</label>
                                <Input type="text" placeholder='Brand' id="brand" name="brand" onChange={this.handleProduct} />

                            </div>
                        }

                        {(this.state.category === "men's fashion" || this.state.category === "women's fashion") &&
                            <div className="AddProduct-field">
                                <label className="label-field">Size</label>
                                <Checkbox className="sizebox"  id="1" checked={false} onChange={this.handleChange} label='small' />
                                <Checkbox className="sizebox" label='medium' />
                                <Checkbox className="sizebox" label='large' />
                                <Checkbox className="sizebox" label='x-large' />
                                <Checkbox label='xx-large' />
                            </div>
                        }

                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Prices <sup style={{ color: 'red' }}>*</sup>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <div className="AddProduct-field">
                            <label className="label-field">SalesPrice<sup style={{ color: 'red' }}>*</sup></label>
                            <Input type="number" id="price" name="price" placeholder="Enter price" value={this.state.price} onChange={this.handleProduct} />
                            <label className="label-field">MRP</label>
                            <Input type="number" id="mrp" name="mrp" placeholder="Enter price" value={this.state.mrp} onChange={this.handleProduct} />
                        </div>
                        <div className="AddProduct-field">
                            <label className="label-field">Delivery Cost</label>
                            <Input type="number" id="manufactureCost" name="manufactureCost" placeholder="Enter price" value={this.state.manufactureCost} onChange={this.handleProduct} />
                            <label className="label-field">Manufacturer</label>
                            <Input type="text" id="manufacturer" name="manufacturer" placeholder="manufacturer" value={this.state.manufacturer} onChange={this.handleProduct} />
                        </div>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 4}
                        index={4}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Inventory
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 4}>

                        <div className="AddProduct-field">
                            <label className="label-field">quantity</label>
                            <Input type="number" id="inventoryQty" name="inventoryQty" placeholder="Enter quantity" value={this.state.inventoryQty} onChange={this.handleProduct} />
                        </div>

                    </Accordion.Content>
                </Accordion>
                <div className="submit-div">
                    <Button disabled={validated} positive onClick={() => this.onAddproduct()}>ADD PRODUCT</Button>
                </div>

                {/* <Prompt when={this.state.modified} message="Are you sure you want to leave this page?"></Prompt> */}
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

export default connect(mapStateToProps, { addProduct, resetProductId })(withRouter(AddProduct))