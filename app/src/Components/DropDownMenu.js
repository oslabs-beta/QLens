// create a button to send schema data to the backend to receive schema data back
// research code mirror to hold the schemas
// todo: create functionality so that when a checkbox is clicked, the schema appears on the page

import React from 'react';
import CheckBox from './CheckBox';
import {ipcRenderer} from "electron";
import ResetButton from './ResetButton';

const DropDownMenu = ({schemaData, uriData, sendSchemas, addCheckmark, toggleBtn, toggleCheckbox, resetBtn, resetButton}) => {
  const checkBoxComponents = [];

  for (let key in schemaData) {
    checkBoxComponents.push(
      <CheckBox name={key} key={`dropdown${key}`} clicked={addCheckmark} toggleCheckbox={toggleCheckbox} />
    )
  }

  return(
    <div className="dropDown">
      <div className="menuItems">
      {checkBoxComponents}
      </div>
      <div className="addSchemaBtn" >
        <button className={toggleBtn ? "AddSelectedSchemasButton": "disableAddSelected"} onClick={sendSchemas} disabled={!toggleBtn}><span>Add Schemas</span></button>
        <ResetButton resetBtn={resetBtn} />
      </div>
    </div>
  )
}

export default DropDownMenu;

