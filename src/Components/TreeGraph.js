import React from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import '../public/index.css';

// let data = {
// 	name: 'Parent',
// 	children: [{
// 		name: 'Child One'
// 	}, {
// 		name: 'Child Two'
// 	}]
// };
const TreeGraph = ({ schemaChart }) => {
  return(
    <div className="tree">
      <Tree
        data={schemaChart}
        height={600}
        width={600}
        animated={true}
        svgProps={{
          className: 'custom'
        }}/>
        />
    </div>
  )
}

export default TreeGraph;