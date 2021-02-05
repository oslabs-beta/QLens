import React, { useState, useEffect } from 'react';

const CheckBox = (props) => {
  return (
    <div>
      <form>
        <label>
          <input type= "checkbox" name={props.name} onClick={props.clicked} />
          {/* name is the key which is the obj */}
          {props.name}
        </label>
      </form>
    </div>
  )
}



export default CheckBox;