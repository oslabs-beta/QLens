import React from 'react';
import {jest} from '@jest/globals';

// set up mockState with real state name as prop, and state properties passed in

export const schemaDataState = {
  schemaDataState: {},
};

export const schemaDataSetState = {
  generalState: {
    setSchemaData: jest.fn(),
  },
};

export const uriIdState = {
    uriIdState: {},
  };
  
  export const uriIdSetState = {
    uriIdState: {
        setUriId: jest.fn(),
    },
};

export const selectedSchemaDataState = {
    selectedSchemaDataState: {},
  };
  
  export const selectedSchemaDataSetState = {
    selectedSchemaDataState: {
        setSelectedSchemaData: jest.fn(),
    },
};

export const clickedState = {
    clicked: {},
  };
  
  export const clickedSetState = {
    clicked: {
        setClicked: jest.fn(),
    },
};


export const graphQLSchemaState = {
    graphQLSchema: {},
  };
  
  export const graphQLSchemaSetState = {
    graphQLSchema: {
        setGraphQLSchema: jest.fn(),
    },
};

// export const homeGenState = {
//     generalState: {
//       onHomePage: true,
//       URImodal: false,
//       helpModal: false,
//     },
//   };
  
//   export const appGenState = {
//     generalState: {
//       onHomePage: false,
//       URImodal: false,
//       helpModal: false,
//       generalDispatch: jest.fn(),
//     },
//   };