import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Promotions.css'



class Promotions extends Component {
    state = {
        sources: []
    }
    componentDidMount() {
        axios.get(`https://shopingmarketapi.herokuapp.com/promotions?category=${this.props.category}`).then((response) => {
            console.log("kkkkk", response);
            this.setState({ sources: response.data });
        })
    }
    render() {
        console.log(this.state)
        if (this.state.sources.length === 0) {
            return ("")
        }
        else {
            return (
                <Carousel>
                    {this.state.sources.map(el => {
                        return (
                            <Carousel.Item className="pro_item">
                                <img src={el.url} alt="First slide" />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            )
        }



    }
}

export default Promotions;