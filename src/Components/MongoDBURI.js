import React, { useState, useEffect } from "react"; // userEffect to fetch instead of component mount
import DropDownMenu from "./DropDownMenu";

// input field for the mongoDB uri
const MongoDBURI = () =>  {
    const [schemaData, setSchemaData] = useState({});
    const [uriId, setUriId] = useState('');

    const submit = (e) => {I
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

    //uriId = document.getElementById('uriInput').value;
    const getUri = (e) => {
      setUriId(e.target.value);
    };

    console.log("state is being set", schemaData);

    return (
        <div className="formContainer">
            <div>
              <form>
                  <input type="text" placeholder="enter MongoDBURI ..." onChange= {getUri}/>
                  <input className="URISubmitButton" type="submit" value="Submit" onClick={submit}/>
              </form>
            </div>
            <DropDownMenu schemaData={schemaData} uriData={uriId} />
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