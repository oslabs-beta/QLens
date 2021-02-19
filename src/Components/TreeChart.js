// import React, { useRef, useEffect } from "react";
// import { select, hierarchy, tree, linkHorizontal } from "d3";
// import useResizeObserver from "./useResizeObserver";
// import '../public/index.css'

// function usePrevious(value) {
//   const ref = useRef(); // utilize useRef to hold SVG element
//   useEffect(() => {
//     ref.current = value; // A ref is "get" and "set" via it's .current property
//   });
//   return ref.current;
// }

// // let schemaChart = {};
// //   if (selectedSchemaData[0]) {
// //     schemaChart = {
// //       name: 'Database Schema',
// //       children: [],
// //     }
// //     let i = 0;
// //     let childArr = [];
// //     for (let key in selectedSchemaData[0]) {
// //       console.log(selectedSchemaData[0][key])
// //         for (let prop in selectedSchemaData[0][key]) {
// //           childArr.push({name: prop})
// //         }
// //         console.log(childArr);
// //         schemaChart.children[i] = {
// //           name: key,
// //           children: childArr,
// //         };
// //         childArr = [];
// //         i++
// //     }
// //   }


// function TreeChart({ schemaChart }) {
//   const svgRef = useRef();
//   const wrapperRef = useRef();
//   const dimensions = useResizeObserver(wrapperRef);

//   // we save data to see if it changed
//   const previouslyRenderedData = usePrevious(schemaChart);
//   console.log('schemaChaaaaaaaaart!!!!', schemaChart, svgRef)
//   // if (Object.keys(schemaChart).length > 0) {

//     // will be called initially and on every data change
//     useEffect(() => {
//       const svg = select(svgRef.current);

//       // use dimensions from useResizeObserver,
//       // but use getBoundingClientRect on initial render
//       // (dimensions are null for the first render)
//       const { width, height } =
//         dimensions || wrapperRef.current.getBoundingClientRect();

//       // transform hierarchical data
//       const root = hierarchy(schemaChart);
//       const treeLayout = tree().size([height, width]);

//       const linkGenerator = linkHorizontal()
//         .x(link => link.y)
//         .y(link => link.x);

//       // enrich hierarchical data with coordinates
//       treeLayout(root);

//       console.warn("descendants", root.descendants());
//       console.warn("links", root.links());

//       // nodes
//       svg
//         .selectAll(".node")
//         .data(root.descendants())
//         .join(enter => enter.append("circle").attr("opacity", 0))
//         .attr("class", "node")
//         .attr("cx", node => node.y)
//         .attr("cy", node => node.x)
//         .attr("r", 50)
//         .attr("fill", "black")
//         .transition()
//         .duration(500)
//         .delay(node => node.depth * 300)
//         .attr("opacity", 1);

//       // links
//       const enteringAndUpdatingLinks = svg
//         .selectAll(".link")
//         .data(root.links())
//         .join("path")
//         .attr("class", "link")
//         .attr("d", linkGenerator)
//         .attr("stroke-dasharray", function() {
//           const length = this.getTotalLength();
//           return `${length} ${length}`;
//         })
//         .attr("stroke", "black")
//         .attr("fill", "black")
//         .attr("opacity", 1);

//       if (schemaChart !== previouslyRenderedData) {
//         enteringAndUpdatingLinks
//           .attr("stroke-dashoffset", function() {
//             return this.getTotalLength();
//           })
//           .transition()
//           .duration(500)
//           .delay(link => link.source.depth * 500)
//           .attr("stroke-dashoffset", 0);
//       }

//       // labels
//       svg
//         .selectAll(".label")
//         .data(root.descendants())
//         .join(enter => enter.append("text").attr("opacity", 0))
//         .attr("class", "label")
//         .attr("x", node => node.y)
//         .attr("y", node => node.x - 12)
//         .attr("text-anchor", "middle")
//         .attr("font-size", 24)
//         //.text(node => node.schemaChart.name)
//         .text(node => node.schemaChart)
//         .transition()
//         .duration(500)
//         .delay(node => node.depth * 300)
//         .attr("opacity", 1);
//     }, [schemaChart, dimensions, previouslyRenderedData]);

//   // }

//   return (
//     <div className="tree" ref={wrapperRef} style={{zIndex:"2", marginBottom: "2rem" }}>
//       {/* <svg width="300px" height="150px">
//   <rect x="20" y="20" width="20px" height="20" rx="5" ry="5" />
//   <rect x="60" y="20" width="20px" height="20" rx="5" ry="5" />
//   <rect x="100" y="20" width="20px" height="20" rx="5" ry="5"/>
//  </svg> */}

//       <svg ref={svgRef}></svg>
//     </div>
//   );
// }


// export default TreeChart;
