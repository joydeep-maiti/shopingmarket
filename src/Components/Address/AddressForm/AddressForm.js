import React, { useState } from 'react';
import './AddressForm.css'
import {Form,Button} from 'react-bootstrap'

const AddressForm = (props) => {
    // console.log(props)
    const [ state, setState] =useState({
        formData:{},
        validation:{
            name: true,
            addressLine: true,
            mob: true,
            city: true,
            state: true,
            zipCode: true
        },
        valid: true
    })
    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
        let valid;
        if(event.target.value === "" || event.target.value == null || event.target.value == undefined){
            valid = false
        }
        else{
            valid = true
        }
        setState({
            ...state,
            formData :{
                ...state.formData,
                [event.target.name]:event.target.value
            },
            validation :{
                ...state.validation,
                [event.target.name]:valid
            }
        })
    }

    const onAdd = (event)=> {
        // if(state.validation.name && state.validation.addressLine && state.validation.city && state.validation.zipCode && state.formData.name && state.formData.name!=="" && state.formData.addressLine && state.formData.addressLine!=="" && state.formData.city && state.formData.city!=="" && state.formData.zipCode && state.formData.zipCode!==""){
        //     props.addAddress(state.formData);
        // }else {
        //     alert("All fields are required")
        // }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return
        }
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === true) {
            props.addAddress(state.formData);
        }
        
    }

    return(
        <Form noValidate validated={validated}  onSubmit={onAdd}>
            <Form.Group controlId="validationCustom01">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" 
                // style={{borderColor:state.validation.name?"gainsboro":"red"}} 
                placeholder="Enter Full Name" name="name" onChange={(e)=>handleChange(e)} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter your Full name
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group  controlId="validationCustom02">
                <Form.Label>Address Line</Form.Label>
                <Form.Control type="text" 
                // style={{borderColor:state.validation.addressLine?"gainsboro":"red"}} 
                placeholder="Enter Address" name="addressLine" onChange={(e)=>handleChange(e)} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter your address.
                </Form.Control.Feedback>                
            </Form.Group>
            <Form.Group controlId="validationCustom03">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="number" min={1000000000} max={9999999999}  
                // style={{borderColor:state.validation.mob?"gainsboro":"red"}} 
                placeholder="Enter Phone Number" name="mob" onChange={(e)=>handleChange(e)} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid Phone number
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom04">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" 
                // style={{borderColor:state.validation.city?"gainsboro":"red"}} 
                placeholder="Enter City" name="city" onChange={(e)=>handleChange(e)} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a City 
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom05">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" 
                // style={{borderColor:state.validation.state?"gainsboro":"red"}} 
                placeholder="Enter State" name="state" onChange={(e)=>handleChange(e)} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a State name
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom06">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="number" min={100000} max={999999} 
                // style={{borderColor:state.validation.zipCode?"gainsboro":"red"}} 
                placeholder="Enter Zip Code" name="zipCode" onChange={(e)=>handleChange(e)} required/>
                <Form.Control.Feedback type="invalid">
                    Please enter a valid Zipcode
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit">
                ADD
            </Button>
        </Form>
    )
}

export default AddressForm;
