import React, { useState, useEffect } from "react"; // userEffect to fetch instead of component mount
import DropDownMenu from "./DropDownMenu";

// input field for the mongoDB uri
const MongoDBURI = () =>  {
    const [schemaData, setSchemaData] = useState({});

    const submit = (e) => {
      e.preventDefault()
      console.log('submit worked')
      fetch('http://localhost:3000/getURI', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({val: 'mongodb+srv://judy:hush@hush.u9hai.mongodb.net/chat?retryWrites=true&w=majority'})
      })
      .then(res => res.json())
      .then((data) => {
        console.log('data string from fetch', data)
        setSchemaData(JSON.parse(data));
      })
      .catch(err => console.log(err))
    }

    console.log("state is being set", schemaData);

    return (
        <div className="formContainer">
            <div>
              <form>
                  <input type="text" placeholder="enter MongoDBURI ..."/>
                  <input className="URISubmitButton" type="submit" value="Submit" onClick={submit}/>
              </form>
            </div>
            <DropDownMenu schemaData={schemaData} />
        </div>
    )
}

export default MongoDBURI;



    //To-Dos:
        //onsubmit, onchange function
        //fetch mongoDBSchemas from backend
        //figure out state
        //get each schema from data obj, send it to DropDownMenu using object.keys to get keys of arr then pass to DropDownMenu
        //in DropDownMenu, we would pair one CheckBox with one Schema