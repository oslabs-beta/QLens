// create a button to send schema data to the backend to receive schema data back
// research code mirror to hold the schemas
// todo: create functionality so that when a checkbox is clicked, the schema appears on the page

import React, { useState, useEffect } from 'react';
import CheckBox from './CheckBox';

const DropDownMenu = ({schemaData}) => {
  const [ clicked, setClicked ] = useState([]);

  const addCheckmark = (item) => {
    // pass onClick into
    // when clicked it will add specific schema to send to backend
    // send data to state
    // const schemaNames = Object.keys(schemaData);// [users, conversations]

    let clickedSchema = item.target.name;

    if (clicked.includes(clickedSchema)) {
      console.log('includes pass')
      setClicked(clicked.filter(tool => {
        console.log('filter pass')
        console.log('tool is ===', tool)
        return tool !== clickedSchema
      }));
    } else {
      setClicked([...clicked, clickedSchema]);
    }
  }
    //To-Do
    // when the add schema button is clicked, we will need to send the schema name to the backend so they can send the schema to the frontend. 
    // create a function that matches the checked schema names with the key that is in the schemaData object and sends back the object to the backend! 
    // YAY CHO!!! yaaassss!! <3

  const checkHandler = e => {
    const schemaNames = Object.keys(schemaData);
    const tools = props.schemaNames.clicked; //Array in parent component
    const value = e.target.value; //Checkbox value

    props.addCheckmark(value);
  };

  const sendSchemas = (e) => {
    console.log('clicked array',clicked);
  }

  const checkBoxComponents = [];

  for (let key in schemaData) {
    checkBoxComponents.push(
      <CheckBox name={key} key={`checkbox${key}`} clicked={addCheckmark} />
    )
  }

  return(
    <div>
      <div>
      {checkBoxComponents}
      </div>
      <div>
        <button onClick={sendSchemas}>Add Selected Schemas</button>
      </div>


    </div>

  )
}
export default DropDownMenu;


// output the schema options onto the dropdown menu
// fetch the schemas from whichever box is checked
// dropdown menu will display on the left and still be visible after the user chooses the schema
// stretch: expand and collapse / scroll bar for lots of schemas


//create onclick function, if clicked, add this key, to state

  // schemaData = {
  //   users: {

  //   },
  //   conversations: {

  //   }
  // }

  // iterare over all the schema names
  // create a checkbox for each iteration
  // const createdCheckBoxes

  //create component of checkbox, map over schemas from backend, pass in new checkbox each time
  //in checkbox component, have state there

  // const schemas = ['People', 'Places', 'Pets', 'Platters'];
  //const createdCheckBoxes = schemas.map((schemaName) => {
    //   return(
    //     <form>
    //        <div className="radioButtons">
    //          <label>
    //            <input type="checkbox" value={schemaName} onClick={toggleFunction} />
    //            {schemaName}
    //            </label>
    //        </div>
    //     </form>

    //   )
    // })

    // map through the schema array
    // create a new element for each schema (new checkbox)
    // assign the value to be the current schema

  //   for (let i = 0; i < schemaNames.length; i+=1) {
      
  //    if (schemaNames[i].includes(clickedSchema) && e.target.checked === false) {
  //     console.log('hiiii')
  //     setClicked(clicked.filter((item) => {
  //       item.value !== clickedSchema // user = conversions
  //       console.log('this is the item[clickedSchema] =====', item[clickedSchema])
  //       console.log('item is ', item)
  //       console.log('clickedSchema is ', clickedSchema)
  //       console.log('schemaNames[i] is ', schemaNames[i])
  //     }));
  //   } else if (schemaNames[i] === clickedSchema && e.target.checked === true) {
  //     // setClicked([...clicked, {[currentName]: schemaData[currentName]}])
  //     setClicked([...clicked, {[clickedSchema]: schemaData[clickedSchema]}])
  //  }
  //   }


    // check if clickedSchema is truthy and target.checked is false
    // we can filter the clicked array and change the state to be everything except the schemaData[clickedSchema]


//The filter() method creates a new array with all elements that pass the test implemented by the provided function.

  // array.reduce ( (resultArr, currVal) => {
  //   if currVal === clickedSchema {
  //     resultArr.push(clickedSchema)
  //   }
  // }, [] )

      // if (clickedSchema && e.target.checked === false) {
      //   setClicked(clicked.reduce((resultArr, currentVal => {
      //     if (currentVal !== clickedSchema) {
      //       resultArr.push(clickedSchema)
      //     }
      //     //item[conversations] = object
      //      console.log('In the new if statement')
      //      console.log('item ====> ', item);
      //     })

      //     )
      //     console.log('clicked array being filtered', clicked)
      // }

    // console.log('clicked', clicked);
    // console.log(schemaData.users);
    // if the box is unchecked
    // console.log('checked', e.target.checked);