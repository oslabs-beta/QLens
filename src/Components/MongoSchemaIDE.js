
import React, { useState, useEffect } from 'react';
import Codemirror from 'codemirror';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/javascript/javascript');
import '../public/codemirror.css';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/dracula.css';
const _ = require('lodash');

const MongoSchemaIDE = ({schemaData, selectedSchemaData}) => {
  const [data, setData] = useState([]);
  // console.log('from mongoIDE schemaData', schemaData)
  // console.log('this is data ====>', data);
  // let data = '<h1>hiiiii</h1>';

  // if (schemaData) {
  //   data = schemaData;
  // }

  console.log('this is selectedSchemaData =====>', selectedSchemaData);


  useEffect(() => {
    setData([...data, schemaData]);
  }, [])
  console.log('this is in mongoSchema =====>', data);
  console.log('isEmpty ====', _.isEmpty(data[0]))
  return(

    <div>
      <div className="codebox">
        <CodeMirror
        value={_.isEmpty(selectedSchemaData[0]) ? '<h1>hiiii</h1>' : JSON.stringify(...selectedSchemaData)}
        options={{
          mode: 'javascript',
          theme: 'dracula',
          lineNumbers: true
        }}
        />
        </div>
        <div className="codebox2">
          <CodeMirror
          value='<h1>Judy with the BIGGGGGG booty! yasss queen! </h1>'
          options={{
            mode: 'javascript',
            theme: 'dracula',
            lineNumbers: true
          }}
          />
      </div>
    </div>
  )
}

export default MongoSchemaIDE;