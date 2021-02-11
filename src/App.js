// Import dependencies
import React from 'react'
import MongoDBURI from './Components/MongoDBURI';
import DropDownMenu from './Components/DropDownMenu';
import Container from './containers/Container';
import './public/index.css';
import PlaygroundButton from './Components/PlaygroundButton'


// Create main App component
const App = () => (
  <div>
    <div>
      <PlaygroundButton/>
    </div>
    <div>
      <img id="logo" src="https://i.ibb.co/PYBbKLK/Screen-Shot-2021-02-11-at-10-21-02-AM.png" alt="QLens-logo" border="0"/>
      <Container />
    </div>
  </div>
)

// Export the App component
export default App
