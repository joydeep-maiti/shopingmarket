import React,{Component} from 'react';
import axios from 'axios'

class Utilities extends Component {
    state={
        categories:[],
        categoryName:'all'
    }
    componentDidMount(){
        // axios.get(`http://localhost:5000/category`).then((response) =>{
        axios.get(`https://marketplace--server.herokuapp.com/category`).then((response) =>{
            console.log(response);
            this.setState({categories:response.data.data });
        })
    }
    onCategorySelect(e) {
        console.log("[CATEGORY]",e.target.value);
        this.setState({
            categoryName:e.target.value
        })
        this.props.onCategorySelect(e.target.value)
    }

    render(){
        console.log(this.state)
        return(
            <select className="dpMenu" onChange={(e)=>this.onCategorySelect(e)} value={this.props.category}>
                
               {this.state.categories.map((item,pos) =>
                    <option className="myop"  key={pos} value={item.categoryName.toLowerCase()}>{item.categoryName}</option>)
                }
            </select>
        )
        
    }
}

export default Utilities;