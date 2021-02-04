
// output the schema options onto the dropdown menu
// fetch the schemas from whichever box is checked
// dropdown menu will display on the left and still be visible after the user chooses the schema
// stretch: expand and collapse / scroll bar for lots of schemas

import { set } from 'mongoose';
import React, { useState, useEffect } from 'react';

const DropDownMenu = () => {

  const [ checkMark, setCheckMark ] = useState(true);

  const toggleFunction = () => {
    setCheckMark(!checkMark)
  }

  //create component of checkbox, map over schemas from backend, pass in new checkbox each time
  //in checkbox component, have state there
  
  const schemas = ['People', 'Places', 'Pets', 'Platters'];
  const createdCheckBoxes = schemas.map((schemaName) => {
    return(
      <form>
         <div className="radioButtons">
           <label>
             <input type="checkbox" value={schemaName} onClick={toggleFunction} />
             {schemaName}
             </label>
         </div>
      </form>

    )
  })
  return(
    // from the database, we will need to iterate over the number of schemas available
    // for each schema, we will need to create a radio button with a label that is the schema name
    <div>
      {createdCheckBoxes}
    </div>

  )
}

export default DropDownMenu;