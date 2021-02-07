// Import dependencies
import React from 'react'
import MongoDBURI from './Components/MongoDBURI';
import DropDownMenu from './Components/DropDownMenu';
import Container from './containers/Container';
import './public/index.css'


// Create main App component
const App = () => (
  <div>
    <img id="logo" src="https://i.ibb.co/KFmZK7N/qlens-logo.png" alt="qlens-logo" border="0" />
    <Container />
  </div>
)

// Export the App component
export default App
