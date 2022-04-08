

import React from 'react';
import DeleteIcon from '../img/delete.png'
import "../styles/ColorElement.scss"

const ColorElement = (props : {HEX : string, index : number , removeFunction : Function , deleteDisabled : boolean} ) => {
    return(
    <div  className={"ColorElement-container"}>
        <div className={"ColorElement-left-section"} >
                <div className={"ColorElement-ractangle"} style = {{backgroundColor : props.HEX}}  />
                <h3 >{props.HEX.toUpperCase()}</h3>
        </div>
        {!props.deleteDisabled && <img onClick={() => props.removeFunction(props.index)} className={"ColorElement--delete-icon"} src={DeleteIcon} alt={"deleteIcon"}/> }

    </div>);
}

export default ColorElement;
