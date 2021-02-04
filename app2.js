// Import dependencies
import React from 'react'
// import fetch from 'electron-fetch'
// const electron = require('electron')
const { net } = require('electron')

// Create main App component
const App = () => {
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
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }
  
  return (
  <div>
    <h1>Hello, electron!</h1>

    <p>Our Electron App is working!!!</p>
    <button onClick={submit}>Here</button>
  </div>
  )
  }



// Export the App component
export default App
