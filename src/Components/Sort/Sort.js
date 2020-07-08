import React, { Component } from 'react'
import './Sort.css'

class Sort extends Component{
    state={
        showSort:false,
    }
    onMobileDivClick1 =() =>{
        return(
            this.setState({showSort: !this.state.showSort})
        )
    }
    render(){
        return(
            <div className="mainBlock">
                 <button className="sortButton" onClick={this.onMobileDivClick1}>Sort</button>
                 
            <div className={`sorting ${this.state.showSort ? 'show' : 'hide'}`}>
            <div className="sortByName">Sort By</div>
                        <input type="checkbox" id="Relevance" name="Relevance" value="Relevance" />
                        <label for="Relevance"> Relevance</label><br></br>
                        <input type="checkbox" id="Price(Lowest First)" name="Price(Lowest First)" value="Price(Lowest First)" />
                        <label for="Price(Lowest First)"> Price (Lowest First)</label><br></br>
                        <input type="checkbox" id="Price(Highest First)" name="Price(Highest First)" value="Price(Highest First)" />
                        <label for="Price(Highest First)"> Price (Highest First)</label><br></br>
                        <input type="checkbox" id="What's New" name="What's New" value="What's New" />
                        <label for="What's New"> What's New</label><br></br>
            </div>
            </div>
        )
    }
}

export default Sort;