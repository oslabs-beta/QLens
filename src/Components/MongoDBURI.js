import React, { useState, useEffect } from "react"; // userEffect to fetch instead of component mount


// input field for the mongoDB uri
const MongoDBURI = () =>  {

    //To-Dos:
        //onsubmit, onchange function
        //fetch mongoDBSchemas from backend
        //figure out state

    return (
        <div className="formContainer">
            <div>
              <form>
                  <input type="text" placeholder="enter MongoDBURI ..."/>
                  <input className="URISubmitButton" type="submit" value="Submit"/>
              </form>
            </div>
        </div>
    )
}

export default MongoDBURI;