// import React from 'react'
import React, { useState, useEffect, Fragment } from 'react';
import MongoDBURI from '../Components/MongoDBURI';
import MongoSchemaIDE from '../Components/MongoSchemaIDE';
import DropDownMenu from '../Components/DropDownMenu';
import PlaygroundButton from '../Components/PlaygroundButton';
// import Tree from '../Components/Tree';
// import TreeChart from '../Components/TreeChart';
import TreeGraph from '../Components/TreeGraph';
import Loader from '../Components/Loader';
import Ribbon from '../Components/Ribbon';
import fetch from 'electron-fetch'
import {ipcRenderer} from "electron";
import ResetButton from '../Components/ResetButton'

const Container = () => {
  const [schemaData, setSchemaData] = useState({});
  const [uriId, setUriId] = useState('');
  const [selectedSchemaData, setSelectedSchemaData] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [graphQLSchema, setGraphQLSchema] = useState({});
  const [loading, setLoading] = useState(false);

  const [toggleASSBtn, setToggleASSBtn] = useState(false)
  const [toggleInput, setToggleInput] = useState(false)
  const [toggleCheckbox, setToggleCheckbox] = useState(false)

  // enter MongoDBURI to receive schemas
  // submit function fetches schemas from backend when Submit button is clicked

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    ipcRenderer.send('URI', uriId)
    setToggleASSBtn(!toggleASSBtn)
    setToggleInput(!toggleInput)
  };

  const resetButton = () => {
    window.location.reload(true);
  }

  ipcRenderer.on('URI-reply', (event, arg) => {
    setSchemaData(JSON.parse(arg));
    setLoading(false);
  })
  // updating state with the MongoDBRUI from input field
  const getUri = (e) => {
    setUriId(e.target.value);
    console.log(uriId);
  };

  const addCheckmark = (item) => {
    let clickedSchema = item.target.name;
    if (clicked.includes(clickedSchema)) {
      setClicked(
        clicked.filter((tool) => {
          return tool !== clickedSchema;
        })
      );
    } else {
      setClicked([...clicked, clickedSchema]);
    }
  };
  // sendSchema function builds the selectedSchemas object with the schemas that are selected in the DropDownMenu
  // sends the selectedSchemas to the backend for migration
  const sendSchemas = (e) => {
    let selectedSchemas = {};
    for (let i = 0; i < clicked.length; i += 1) {
      selectedSchemas[clicked[i]] = schemaData[clicked[i]];
    }
    setSelectedSchemaData([selectedSchemas]);
    setClicked([])
    setToggleASSBtn(!toggleASSBtn)
    setToggleCheckbox(!toggleCheckbox)
    ipcRenderer.send('selectedSchemas', {selectedSchemas, uriId})
  };

  ipcRenderer.on('returnedSchemas', (event, arg) => {
    setGraphQLSchema(arg)
    setClicked([]);
  })

  // creating formatted object for d3 graph
  let schemaChart = {};
  if (selectedSchemaData[0]) {
    schemaChart = {
      name: 'Database Schema',
      children: [],
    };
    let i = 0;
    let childArr = [];
    for (let key in selectedSchemaData[0]) {
      console.log(selectedSchemaData[0][key]);
      for (let prop in selectedSchemaData[0][key]) {
        childArr.push({ name: prop });
      }
      console.log(childArr);
      schemaChart.children[i] = {
        name: key,
        children: childArr,
      };
      childArr = [];
      i++;
    }
  }

  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <div style={loading ? { opacity: '.1' } : { opacity: '1' }}>
        <div className="container">
          <img
            className="logo"
            src="https://i.ibb.co/PYBbKLK/Screen-Shot-2021-02-11-at-10-21-02-AM.png"
            alt="QLens-logo"
            border="0"
          />
          <MongoDBURI
            schemaData={schemaData}
            uriData={uriId}
            geturi={getUri}
            submitbtn={submit}
            sendSchemas={sendSchemas}
            addCheckmark={addCheckmark}
            toggleInput= {toggleInput}
          />
          <PlaygroundButton />
        </div>
        <div className="grid-container">
        <DropDownMenu
            schemaData={schemaData}
            uriData={uriId}
            sendSchemas={sendSchemas}
            addCheckmark={addCheckmark}
            toggleBtn={toggleASSBtn}
            toggleCheckbox={toggleCheckbox}
          />
          {Object.keys(schemaChart).length > 0 ? (
            <TreeGraph schemaChart={schemaChart} />
          ) : null}
          <MongoSchemaIDE
            selectedSchemaData={selectedSchemaData}
            graphQLSchema={graphQLSchema}
          />
        </div>
        <Ribbon/>
        <ResetButton
          resetBtn={resetButton}
        />
      </div>
    </Fragment>
  );
};

export default Container;
