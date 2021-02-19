import React, { useState, useEffect } from 'react';
// import MongoSchemaIDE from 'MongoSchemaIDE';

const CheckBox = (props) => {
  return (
    <div className="checkboxContainer" id="box">
      <form className="checkboxForm">
        <label className="checkboxLabel">
          <input type="checkbox" name={props.name} onClick={props.clicked} />
          {/* name is the key which is the obj */}
          {props.name}
        </label>
      </form>
    </div>
  )
}



export default CheckBox;