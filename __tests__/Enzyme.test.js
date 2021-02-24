import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

// import custom useContext
import * as MockContexts from '../app/src/state/Contexts';

// import mock cases
import { schemaDataState, schemaDataSetState } from '../__mocks__/MockCases';
import { uriIdState, uriIdSetState } from '../__mocks__/MockCases';
import { selectedSchemaDataState, selectedSchemaDataSetState } from '../__mocks__/MockCases';
import { clickedState, clickedSetState } from '../__mocks__/MockCases';
import { graphQLSchema, graphQLSetSchema } from '../__mocks__/MockCases';

// import React Components
import CheckBox from '../app/src/Components/CheckBox';
import DropDownMenu from '../app/src/Components/DropDownMenu';
import MongoDBURI from '../app/src/Components/MongoDBURI';
import MongoSchemaIDE from '../app/src/Components/MongoSchemaIDE';
import PlaygroundButton from '../app/src/Components/PlaygroundButton';
import TreeGraph from '../app/src/Components/TreeGraph';
import App from '../app/src/App';

configure({ adapter: new Adapter() });

describe('<App> renders on electron app', () => {
    const wrapper = shallow(<App />);
  
    it('App contains Logo', () => {
      expect(wrapper.find('img')).toBeTruthy();
    });
})

describe('MongoDBURI Input Box Displays', () => {
  it('MongoDBURI Input Box renders initially', () => {
    // jest spyOn can only spy on functions, which is why we created our custom useContext (clients/state/context.jsx)
    // we pass in our mock state as context to the spy
    jest
    .spyOn(MockContexts, 'useGenContext')
    // .mockImplementation(() =>  uriIdState);
    
    const wrapper = shallow(<MongoDBURI />);
    // create a variable that equal holds the boolean value of whether wrapper has a class of NavBarContainer
    const confirm = wrapper.hasClass('formContainer');
    // expects confirm (boolean => true) to be true
    expect(confirm).toBe(true);
  });
})

describe('PlaygroundButton Displays', () => {
  it('PlaygroundButton renders initially', () => {
    // jest spyOn can only spy on functions, which is why we created our custom useContext (clients/state/context.jsx)
    // we pass in our mock state as context to the spy
    jest
    .spyOn(MockContexts, 'useGenContext')
    // .mockImplementation(() => schemaDataState);
    
    const wrapper = shallow(<PlaygroundButton />);
    // create a variable that equal holds the boolean value of whether wrapper has a class of NavBarContainer
    const confirm = wrapper.hasClass('playgroundButton');
    // expects confirm (boolean => true) to be true
    expect(confirm).toBe(true);
  });
})

describe('DropDownMenu Displays', () => {
  it('DropDownMenu renders initially', () => {
    // jest spyOn can only spy on functions, which is why we created our custom useContext (clients/state/context.jsx)
    // we pass in our mock state as context to the spy
    jest
    .spyOn(MockContexts, 'useGenContext')
    // .mockImplementation(() => schemaDataState);
    
    const wrapper = shallow(<DropDownMenu />);
    // create a variable that equal holds the boolean value of whether wrapper has a class of NavBarContainer
    const confirm = wrapper.hasClass('dropDown');
    // expects confirm (boolean => true) to be true
    expect(confirm).toBe(true);
  });
})


describe('TreeGraph Displays', () => {
  it('TreeGraph renders initially', () => {
    // jest spyOn can only spy on functions, which is why we created our custom useContext (clients/state/context.jsx)
    // we pass in our mock state as context to the spy
    jest
    .spyOn(MockContexts, 'useGenContext')
    // .mockImplementation(() => schemaDataState);
    
    const wrapper = shallow(<TreeGraph />);
    // create a variable that equal holds the boolean value of whether wrapper has a class of NavBarContainer
    const confirm = wrapper.hasClass('tree');
    // expects confirm (boolean => true) to be true
    expect(confirm).toBe(true);
  });
})




