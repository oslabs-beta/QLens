import React, { useState, useEffect } from "react";

const PlaygroundButton = () => {
  return (
    <div>
      <button a href="http://localhost:8080">Dashboard</button>
      <button a href="http://localhost:3000/graphql" target="_blank">Playground</button>
    </div>
  )
}

export default PlaygroundButton;