// import React, { useRef, useEffect } from 'react';
// import { select, hierarchy, tree } from 'd3';
// // import useResizeObserver from
// import Tree from 'react-d3-tree';
// import '../public/custom-tree.css';
// import '../public/index.css';
// // This is a simplified example of an org chart with a depth of 2.
// // Note how deeper levels are defined recursively via the `children` property.
// // const orgChart = {
// //   name: 'CEO',
// //   children: [
// //     {
// //       name: 'Manager',
// //       attributes: {
// //         department: 'Production',
// //       },
// //       children: [
// //         {
// //           name: 'Foreman',
// //           attributes: {
// //             department: 'Fabrication',
// //           },
// //           children: [
// //             {
// //               name: "kill me"
// //             },
// //             {
// //               name: 'love me'
// //             }
// //           ],
// //         },
// //         {
// //           name: 'Foreman',
// //           attributes: {
// //             department: 'Assembly',
// //           },
// //           children: [
// //             {
// //               name: 'Worker',
// //             },
// //           ],
// //         },
// //       ],
// //     },
// //   ],
// // };


// // users:
// // email: {type: "string", required: true}
// // forum: {type: "Array", required: true}
// // password: {type: "string", required: true}
// // username: {type: "string", required: true}
// // __v: {type: "number", required: true}
// // _id: {primaryKey: true, type: "Object

// // mongodb+srv://judy:coderepforum@coderep-forum-idfny.mongodb.net/Forum?retryWrites=true&w=majority

// export default function OrgChartTree({selectedSchemaData}) {

//   // code to get tree nodes
//   let schemaChart = {};
//   if (selectedSchemaData[0]) {
//     schemaChart = {
//       name: 'Database Schema',
//       children: [],
//     }
//     let i = 0;
//     let childArr = [];
//     for (let key in selectedSchemaData[0]) {
//       console.log(selectedSchemaData[0][key])
//         for (let prop in selectedSchemaData[0][key]) {
//           childArr.push({name: prop})
//         }
//         console.log(childArr);
//         schemaChart.children[i] = {
//           name: key,
//           children: childArr,
//         };
//         childArr = [];
//         i++
//     }
//   }

//   // iterate over the selectedSchemaData
//   // console.log(Object.keys(selectedSchemaData))
//   function getName(obj) {
//     let name = '';
//     for (let key in obj) {
//       name += obj[key];
//     }
//     return name;
//   }

//   let array = [];

//   for (let key in selectedSchemaData) {
//     console.log('LALLALALALALLA', selectedSchemaData[key])
//   }
//   // const straightPathFunc = (linkDatum, orientation) => {
//   //   const { source, target } = linkDatum;
//   //   return orientation === 'vertical'
//   //     ? `M${source.x},${source.y}L${target.x},${target.y}`
//   //     : `M${source.y},${source.x}L${target.y},${target.x}`;
//   // };

//   return (
//     // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
//     <div id="treeWrapper" style={{ width: '100%', height: '75vh', backgroundColor: 'white', marginTop: '5.5%'}}>
//       <Tree
//       data={schemaChart}
//       rootNodeClassName="node__root"
//       branchNodeClassName="node__branch"
//       leafNodeClassName="node__leaf"
//       // style={{color: "white"}}
//       // pathFunc={straightPathFunc}
//       />
//     </div>
//   );
// }