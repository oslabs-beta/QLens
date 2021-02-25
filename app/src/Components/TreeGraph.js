import React from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'
import '../public/index.css';

const TreeGraph = ({ schemaChart }) => {
  return(
    <div className="tree">
      <Tree
        data={schemaChart}
        height={692.25}
        width={600}
        animated={true}
        svgProps={{
          className: 'custom'
        }}/>
    </div>
  )
}

export default TreeGraph;