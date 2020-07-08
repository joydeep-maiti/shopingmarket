import React from 'react';
import { Alert } from 'react-bootstrap'

function MyAlert(props) {
    let show = props.show;

    const setShowFalse = () => {
        props.onClose();
    }
    console.log(props.show)
    if (show) {
      return (
        <Alert variant={props.variant} onClose={setShowFalse} dismissible>
          {props.msg}
        </Alert>
      );
    }
    return "";
}

export default MyAlert;