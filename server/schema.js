const graphql = require('graphql');
var cloneDeep = require('lodash.clonedeep');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const dummyData = {
  users: {
    _id: {
      primaryKey: true,
      type: 'Object',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
    __v: {
      type: 'number',
      required: true,
    },
  },
  conversations: {
    _id: {
      primaryKey: true,
      type: 'string',
      required: true,
    },
    participants: {
      type: 'Array',
      required: true,
    },
    messages: {
      type: 'Array',
      required: true,
    },
    __v: {
      type: 'number',
      required: true,
    },
  },
};

const getGraphQlType = (key, value) => {
  switch (true) {
    case key.includes('__v'):
      break;
    case key.includes('_id'):
      fieldsObj[key] = { type: GraphQLID };
      break;
    case value.type.includes('string'):
      fieldsObj[key] = { type: GraphQLString };
      break;
    case value.type.includes('Array'):
      fieldsObj[key] = { type: new GraphQLList(GraphQLString) };
      break;
    case value.type.includes('number'):
      fieldsObj[key] = { type: GraphQLInt };
      break;
    case value.type.includes('Object'):
      fieldsObj[key] = { type: GraphQLObjectType };
      break;
    default:
      console.log(value, 'Nothing Triggered-----');
      break;
  }
};

// Function for capitalization
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// -------- Object Types ---------------
// Storing graphql object types
let obj = {};
// Storing properties of each mongo db schema
let fieldsObj = {};
let rootQueryObj = {};
for (const property in dummyData) {
  for (const [key, value] of Object.entries(dummyData[property])) {
    getGraphQlType(key, value);
  }
  const deep = cloneDeep(fieldsObj);

  // Dynamically creating graphql object types
  obj[capitalize(`${property}Type`)] = new GraphQLObjectType({
    name: capitalize(property),
    fields: () => deep,
  });

  rootQueryObj[property] = {
    type: new GraphQLList(obj[capitalize(`${property}Type`)]),
    resolve: function resolve(parent, args) {
      return _.find({});
    },
  };
  // resetting the fieldsObject
  fieldsObj = {};
}

console.log(rootQueryObj);
// -------- Object Types ---------------

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: rootQueryObj,
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
