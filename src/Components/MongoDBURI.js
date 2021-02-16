import React, { useState, useEffect } from "react"; // userEffect to fetch instead of component mount
import '../public/index.css';

// input field for the mongoDB uri
const MongoDBURI = ({schemaData, uriData, submitbtn, geturi}) =>  {
    return (
        <div className="formContainer">
            <div className="formClass">
              <form>
                  <input className="URIForm" type="text" placeholder="enter MongoDBURI ..." onChange= {geturi} />
                  <input className="URISubmitButton" type="submit" value="Submit" onClick={submitbtn} style={{display: "none"}}/>
              </form>
            </div>
        </div>
    )
}

export default MongoDBURI;
