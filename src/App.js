// Import dependencies
import React from 'react'
import MongoDBURI from './Components/MongoDBURI';
import DropDownMenu from './Components/DropDownMenu';

// Create main App component
const App = () => (
  <div>
    <h1>Hello, Electron!</h1>
    <p>Our Electron App is working!!!</p>
    <MongoDBURI />
  </div>
)

// Export the App component
export default App
