// import React from 'react'
import React, { useState, useEffect } from "react";
import MongoDBURI from '../Components/MongoDBURI';
import MongoSchemaIDE from '../Components/MongoSchemaIDE';

const Container = () => {
  const [schemaData, setSchemaData] = useState({});
  const [uriId, setUriId] = useState('');

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

    //uriId = document.getElementById('uriInput').value;
    const getUri = (e) => {
      setUriId(e.target.value);
    };

    console.log("state is being set", schemaData);

  return(
    <div>
      <MongoDBURI schemaData={schemaData} uriData={uriId} geturi={getUri} submitbtn={submit}  />
      <MongoSchemaIDE schemaData={schemaData} />
    </div>
  )
}

export default Container;