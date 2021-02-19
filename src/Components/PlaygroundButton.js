import React, { useState, useEffect } from "react";
import '../public/index.css';

const PlaygroundButton = () => {

//   const button = document.getElementById('<your_button_id>');
//   button.addEventListener('click', () => {
//   createBrowserWindow();
// });
// function createBrowserWindow() {
//   const remote = require('electron').remote;
//   const BrowserWindow = remote.BrowserWindow;
//   const win = new BrowserWindow({
//     height: 600,
//     width: 800
//   });
//   win.loadURL('<url>');
// }
  return (
    <div>
      <button className="btn draw-border"><a href="http://localhost:3000/graphql" target="_blank"></a>Playground</button>
    </div>
  )
}

export default PlaygroundButton;