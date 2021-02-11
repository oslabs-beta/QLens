import React, { useState, useEffect } from "react"; // userEffect to fetch instead of component mount
import DropDownMenu from "./DropDownMenu";
import '../public/index.css';

// input field for the mongoDB uri
const MongoDBURI = ({schemaData, uriData, submitbtn, geturi, sendSchemas, addCheckmark}) =>  {
    return (
        <div className="formContainer">
            <div className="formClass">
              <form>
                  <input className="URIForm" type="text" placeholder="enter MongoDBURI ..." onChange= {geturi} />
                  <input className="URISubmitButton" type="submit" value="Submit" onClick={submitbtn}/>
              </form>
            </div>
            <DropDownMenu schemaData={schemaData} uriData={uriData} sendSchemas={sendSchemas} addCheckmark={addCheckmark} />
        </div>
    )
}

export default MongoDBURI;
