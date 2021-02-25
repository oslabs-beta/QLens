import React, { useState, useEffect } from 'react';
// import MongoSchemaIDE from 'MongoSchemaIDE';

const CheckBox = (props) => {
  return (
    <div className="checkboxContainer" id="box">
      <form className="checkboxForm">
        <label className="checkboxLabel">
          <input className="checkbox" type="checkbox" name={props.name} onClick={props.clicked} disabled={props.toggleCheckbox}/>
          {props.name}
        </label>
      </form>
    </div>
  )
}

export default CheckBox;