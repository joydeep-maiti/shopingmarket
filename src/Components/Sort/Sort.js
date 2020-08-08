import React, { Component } from 'react'
import './Sort.css'
import { connect } from 'react-redux';

class Sort extends Component{
    state={
        showSort:false,
    }
    onMobileDivClick1 =() =>{
        return(
            this.setState({showSort: !this.state.showSort})
        )
    }

    handleOnchange = (e) => {
        // console.log("EVENT", e.target.value)
        this.props.onHandleSort(e);
    }

    render(){
        console.log("SORT", this.props.sort)
        return(
            <div className="mainBlock">
                 <button className="sortButton" onClick={this.onMobileDivClick1}>Sort</button>
                 
            <div className={`sorting ${this.state.showSort ? 'show' : 'hide'}`}>
            <div className="sortByName">Sort By</div>
                <input type="radio" id="Price(Lowest First)" name="price" value="low" onChange={(e)=>this.handleOnchange(e)} checked={this.props.sort==="low"}/>
                <label for="Price(Lowest First)"> Price (Lowest First)</label><br></br>
                <input type="radio" id="Price(Highest First)" name="price" value="high" onChange={(e)=>this.handleOnchange(e)} checked={this.props.sort==="high"}/>
                <label for="Price(Highest First)"> Price (Highest First)</label><br></br>
            </div>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}

export default connect(mapStateToProps)(Sort);