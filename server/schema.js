const graphql = require("graphql");
var cloneDeep = require("lodash.clonedeep");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const url =
 "mongodb+srv://judy:hush@hush.u9hai.mongodb.net/chat?retryWrites=true&w=majority";
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
   type: "Object",
   required: true,
  },
  name: {
   type: "string",
   required: true,
  },
  password: {
   type: "string",
   required: true,
  },
  username: {
   type: "string",
   required: true,
  },
  __v: {
   type: "number",
   required: true,
  },
 },
 conversations: {
  _id: {
   primaryKey: true,
   type: "string",
   required: true,
  },
  participants: {
   type: "Array",
   required: true,
  },
  messages: {
   type: "Array",
   required: true,
  },
  __v: {
   type: "number",
   required: true,
  },
 },
};

const getGraphQlType = (key, value) => {
 switch (true) {
  case key.includes("__v"):
   break;
  case key.includes("_id"):
   fieldsObj[key] = { type: GraphQLID };
   break;
  case value.type.includes("string"):
   fieldsObj[key] = { type: GraphQLString };
   break;
  case value.type.includes("Array"):
   fieldsObj[key] = { type: new GraphQLList(GraphQLString) };
   break;
  case value.type.includes("number"):
   fieldsObj[key] = { type: GraphQLInt };
   break;
  case value.type.includes("Object"):
   fieldsObj[key] = { type: GraphQLObjectType };
   break;
  default:
   console.log(value, "Nothing Triggered-----");
   break;
 }
};

// Function for capitalization
const capitalize = (s) => {
 if (typeof s !== "string") return "";
 return s.charAt(0).toUpperCase() + s.slice(1);
};

 
// Storing graphql object types
let obj = {};
// Storing properties of each mongo db schema
let fieldsObj = {};
let rootQueryObj = {};
for (const property in dummyData) {
 for (const [key, value] of Object.entries(dummyData[property])) {
  getGraphQlType(key, value);
 }
 
// Function will be added to rootQuery resolver. Returns documents
async function run() {
  let dataArr = [];
  const client = new MongoClient(url, {useUnifiedTopology: true});
  const regex = /\/(\w+)\?/g
  const databaseName = url.match(regex)
  const databaseString = databaseName.join('').slice(1, databaseName.join('').length - 1)
  try {
    await client.connect();
    const database = client.db(databaseString);
    const collection = database.collection(property);
    const cursor = collection.find({});
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    await cursor.forEach(data =>{
      dataArr.push(data)
    });
  } 
  finally {
    await client.close();
  }
  return dataArr
}
 const deep = cloneDeep(fieldsObj);
 // Dynamically creating graphql object types
 obj[capitalize(`${property}Type`)] = new GraphQLObjectType({
  name: capitalize(property),
  fields: () => deep,
 });
// dynamically creating fields object in rootQueryType
 rootQueryObj[property] = {
  type: new GraphQLList(obj[capitalize(`${property}Type`)]),
  resolve: function resolve(parent, args) {
    // replace with Find() method Based on your file structure/imports
    return run()
  },
 };
 // resetting the fieldsObject
 fieldsObj = {};
}

const RootQuery = new GraphQLObjectType({
 name: "RootQueryType",
 fields: rootQueryObj,
});

module.exports = new GraphQLSchema({
 query: RootQuery,
});
