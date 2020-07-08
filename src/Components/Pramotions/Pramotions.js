import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Pramotions.css'



class Pramotions extends Component{
     state={
        sources:[]
    }
    componentDidMount(){
        axios.get(`https://marketplace--server.herokuapp.com/promotions`).then((response) =>{
            console.log("promotions",response.data);
            this.setState({sources:response.data});
        })
    }
    render(){
        console.log("[STATE]",this.state)
        if(this.state.sources.length === 0){
            return("")
        }
        else{
        return(
            
            <Carousel>
                {this.state.sources.map(el=>{
                    return (
                        <Carousel.Item className="pro_item">
                            <img  src={el.url}  alt="First slide" />
                        </Carousel.Item>
                    )
                })}
                {/* <Carousel.Item className="pro_item">
                    <img  src={this.state.sources[0].url}  alt="First slide"/>
                </Carousel.Item>
                <Carousel.Item className="pro_item">
                    <img src={this.state.sources[1].url} alt="second slide" 
                />
                </Carousel.Item>
                <Carousel.Item className="pro_item">
                    <img src={this.state.sources[2].url} alt="Third slide" 
                />
                </Carousel.Item> */}
            </Carousel>
       
        )
        }

  

    }
}

export default Pramotions;