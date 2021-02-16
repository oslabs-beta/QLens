// create a button to send schema data to the backend to receive schema data back
// research code mirror to hold the schemas
// todo: create functionality so that when a checkbox is clicked, the schema appears on the page

import React, { useState, useEffect } from 'react';
import CheckBox from './CheckBox';


const DropDownMenu = ({schemaData, uriData, sendSchemas, addCheckmark}) => {

  const checkHandler = e => {
    const schemaNames = Object.keys(schemaData);
    const tools = props.schemaNames.clicked; //Array in parent component
    const value = e.target.value; //Checkbox value

    props.addCheckmark(value);
  };

  const checkBoxComponents = [];

  for (let key in schemaData) {
    checkBoxComponents.push(
      <CheckBox name={key} key={`checkbox${key}`} clicked={addCheckmark} />
    )
  }

  return(
    <div className="dropDown">
      <div>
      {checkBoxComponents}
      </div>
      <div className="addSchemaBtn" >
        <button className="AddSelectedSchemasButton" onClick={sendSchemas}>Add Selected Schemas</button>
      </div>
    </div>
  )
}



export default DropDownMenu;

