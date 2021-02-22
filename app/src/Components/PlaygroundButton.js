import React, { useState, useEffect } from "react";
import '../public/index.css';

const PlaygroundButton = () => {
  return (
    <div className="playgroundButton">
      <button className="draw-border"><a href="http://localhost:3000/graphql" target="_blank">Playground</a></button>
    </div>
  )
}

export default PlaygroundButton;