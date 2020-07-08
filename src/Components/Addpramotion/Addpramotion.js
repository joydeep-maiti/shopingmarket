import React,{Component} from 'react';
import './Addpramotion.css';
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {Alert} from 'react-bootstrap'
import { storageRef } from '../../firebaseConfig'

const initialState ={
    pramotionURL:"",
    category:"all",
    categories:[],
    variant: null,
    show: false,
    msg:null
}
class Addpramotion extends Component{
    state=initialState;

    componentDidMount(){
        axios.get(`https://marketplace--server.herokuapp.com/category`).then((response) =>{
            this.setState({categories:response.data.data });
        })
    }

    handlePramotion=()=>
    { 
        this.setState({
            [event.target.name]: event.target.value

        },
        ()=>console.log("[STATE]", this.state)
        );
    }

    onAddpramotion=(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity() === true){
            let params = {
                promotion: {
                    category:this.state.category.toLowerCase(),
                    url:this.state.pramotionURL
                }
            }
            axios.post(`https://marketplace--server.herokuapp.com/promotions`,params )
            .then((response) =>{
                if(response.status === 201) {
                    this.setState({
                        show:true,
                        variant:"success",
                        msg:response.data.msg,
                        pramotionURL:"",
                        category:"All"
                    })
                }else {
                    this.setState({
                        show:true,
                        variant:"danger",
                        msg:response.data.msg
                    })
                }
            })
            .catch(err=> {
                console.log(err)
            })
        }
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
                pramotionURL:"https://storage.googleapis.com/marketplace-a3727.appspot.com/images/"+filename
            })
        })
        .catch(err=> {
            self.setState({
                showUploadedErr:true,
                showUploaded:false
            })
        });
    }

    render(){
        console.log("ssssss",this.state);
        
        return(
            <div className="addPramotionDiv">
                {this.state.show && <Alert variant={this.state.variant} onClose={() => this.setState({show:false})} dismissible>
                    {this.state.msg}
                </Alert>}
               <h1>Add Promotion</h1>
               <Form className="addPramotionForm" onSubmit={this.onAddpramotion}>
               <Form.Group  as={Row} controlId="productForm">
               <Form.Label column sm={3}>Category<sup style={{color:'red'}}>*</sup></Form.Label>
                <Col sm={9}>
               <Form.Control as="select" className="productControl" name="category" value={this.state.category} onChange={(e)=>this.handlePramotion()}required> 
                {this.state.categories.map((item) =>
                    <option value={item.categoryName}>{item.categoryName}</option>)
                }
               </Form.Control>
               </Col>
                <Form.Label column sm={3} className="label">Promotion Url<sup style={{color:'red'}}>*</sup></Form.Label>
                <Col sm={9}>
                <Form.Control type="url" className="pramotionControl"  name="pramotionURL" value={this.state.pramotionURL} onChange={this.handlePramotion} required />
                </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="productFrom">
                    <Form.Label column sm={3} className="label">Upload Image</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="file" name="thumbnail" className="productControl2" onChange={this.handleUpload} />
                        {this.state.showUploaded && <span className="productControl uploadFeedback">UPLOADED</span>}
                        {this.state.showUploadedErr && <span className="productControl uploadFeedbackErr">UPLOAD FAILED</span>}
                    </Col>
                </Form.Group>
                <Button variant="success" type="submit" >
                Add Promotion
               </Button>
               </Form>   
            </div>
        

        )
    }
}

export default Addpramotion;