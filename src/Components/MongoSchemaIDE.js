import React from 'react';
import Codemirror from 'codemirror';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/javascript/javascript');
import '../public/codemirror.css';
// import '../public/material.css';
// require('../../node_modules/codemirror/lib/codemirror.css');
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/dracula.css';
// import '../../node_modules/codemirror/lib/codemirror.css';
// import '../../node_modules/codemirror/theme/dracula.css';

const MongoSchemaIDE = ({schemaData}) => {
  console.log('from mongoIDE schemaData', schemaData)
  return(

    <div>
      <div className="codebox">
        <CodeMirror
        value='<h1>hi</h1>'
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