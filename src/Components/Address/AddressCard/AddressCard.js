import React from 'react';
import './AddressCard.css'
import AddIcon from '../../../asset/add-icon.png'
const addressCard = (props) => {
    // console.log(props)
    const handleForm = () => {
        props.oncardClick();
    }

    if(props.address){
        return(
            <div className="addressCard" onClick={props.selected} 
            // style={{background: props.address.selected?"linear-gradient(white,rgb(186, 252, 147))":"linear-gradient(white,rgb(171, 213, 247))"}}
            >   
                {props.address.selected && <div className="selectedCardText">SELECTED</div>}
                <h4>{props.address.name}</h4>
                <span className="phNoSpn">{"+91 "+props.address.mob}</span>
                <p>{props.address.addressLine}</p>
                <span>{props.address.city.toUpperCase()},{props.address.state.toUpperCase()}</span><br/>
                <strong>{props.address.zipCode}</strong>
            </div>
        )
    }else {
        return(
            <div className="addressCard addNewAddress" onClick={handleForm}>
                <img src={AddIcon}/>
                ADD NEW
            </div>
        )
    }
}

export default addressCard;