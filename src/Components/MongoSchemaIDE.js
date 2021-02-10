
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

  console.log("UPDATED ROOTQUERY OBJ+++", graphQLSchema)
  // iterates over the graphQLSchema and removes the double quotes
  // after a comma, adds a new line
  // let concat = ''
  // for (let key in graphQLSchema) {
  //   console.log(graphQLSchema[key])
  //   const newKey = graphQLSchema[key].replace(/["]+/g, '');
  //   let array = newKey.split('');
  //   for (let i = 0; i < array.length; i+=1) {
  //     // if (array[i] === ',') {
  //     //   concat += array[i]
  //     //   concat += '\n      '
  //     //  }
  //      if (array[i] === '|') {
  //       array[i] = '\n';
  //       concat += array[i];
  //     }
  //     else if (array[i] === '{' && array[i - 1] === '{') {
  //       continue;
  //     }
  //     else {
  //       concat += array[i]
  //     }
  //   }
  // }



  const eliminateCommas = (obj) => {
    let str = '';

    for (let key in obj) {
      str += obj[key].replace(/["]+/g, '');
    }
    return str;
  }

  const newLinePillar = (str) => {
    let newStr = '';
    let array = str.split('');
    for (let i = 0; i < array.length; i+=1) {
      if (array[i] === '|') {
        array[i] = '\n';
        newStr += array[i];
      } else if (array[i] === '{' && array[i - 1] === '{') {
        continue;
      } else {
        newStr += array[i];
      }
    }
    return newStr;
  }

  const newLineComma = (str) => {
    let newStr = '';
    let array = str.split('');
    for (let i = 0; i < array.length; i+=1) {
      if (array[i] === ',') {
        newStr += array[i];
        newStr += '\n        ';
      } else {
        newStr += array[i];
      }
    }
    return newStr;
  }

  const newTypes = eliminateCommas(graphQLSchema.types);
  const newQueries = eliminateCommas(graphQLSchema.queries);

  // const typeQ = newLinePillar(newTypes);
  const rootQ = newLinePillar(newQueries);

  const typeOutput = newLineComma(newTypes);

  const combineQueries = (query1, query2) => {
    return query1 + query2;
  }

  const combined = combineQueries(typeOutput, rootQ);

  console.log('ROOTQ =========>', rootQ)
  // const newS =

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
          value={_.isEmpty(graphQLSchema) ? '<h1>GraphQLSchema</h1>' : combined}
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