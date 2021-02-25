// Import dependencies
import React from "react";
import Container from "./containers/Container";
import AutoUpdate from "./Components/AutoUpdate";
import "./public/index.css";

// Create main App component
const App = () => {
  return (
  <div>
    <Container />
    <AutoUpdate />
  </div>
  )
}
// Export the App component
export default App;
