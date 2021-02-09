
import React, { useState, useEffect } from 'react';
import Codemirror from 'codemirror';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/mode/javascript/javascript');
import '../public/codemirror.css';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/dracula.css';
const _ = require('lodash');

const MongoSchemaIDE = ({schemaData, selectedSchemaData, graphQLSchema}) => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState({});

  let concat = ''
  for (let key in graphQLSchema) {
    const newKey = graphQLSchema[key].replace(/["]+/g, '');
    let array = newKey.split('');
    console.log(array);
    for (let i = 0; i < array.length; i+=1) {
      if (array[i] === ',') {
        concat += array[i]
        concat += '\n      '
        console.log(array[i])
      } else if (array[i] === '{' && array[i - 1] === '{') {
        continue;
      }
      else {
        concat += array[i]
      }
    }
  }
  console.log('concat is......', concat);


  return(
    <div>
      <div className="codebox">
        <CodeMirror
        value={_.isEmpty(selectedSchemaData[0]) ? `console.log("hello")` : JSON.stringify(...selectedSchemaData)}
        options={{
          mode: 'javascript',
          lineWrapping: true,
          theme: 'dracula',
          lineNumbers: true,
          // autoCloseBrackets: true,
          cursorScrollMargin: 48,
          indentUnit: 2,
          tabSize: 2,
          styleActiveLine: true,
          smartIndent: true,
          // lineSeparator: ",",
        }}
        />
        </div>
        <div className="codebox2">
          <CodeMirror
          value={_.isEmpty(graphQLSchema) ? '<h1>GraphQLSchema</h1>' : concat}
          options={{
            mode: 'javascript',
            lineWrapping: true,
            theme: 'dracula',
            lineNumbers: true,
            // lineSeparator: ",",
            // autoCloseBrackets: true,
            cursorScrollMargin: 48,
            indentUnit: 2,
            tabSize: 2,
            styleActiveLine: true,
            smartIndent: true,
          }}
          />
      </div>
    </div>
  )
}

export default MongoSchemaIDE;