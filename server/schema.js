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

MongoClient.connect(url, function (err, client) {
 // Create a collection we want to drop later
 const collection = client.db("chat").collection("users");
 // Show that duplicate records got dropped
 collection.find({}).toArray(function (err, items) {
  console.log(items);
  client.close();
 });
});



// mongoose.connect('mongodb+srv://judy:hush@hush.u9hai.mongodb.net/chat?retryWrites=true&w=majority')
// let db = mongoose.connection

// db.on('open', function(){

//   mongoose.connection.db.listCollections(function(error, names) {
//     console.log('DATA BASE OPENED')
//     if (error) {
//       throw new Error(error);
//     } else {
//       console.log('NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', names)
//     }
//   });
// });

// let usersCollection = mongoose.model('user')
// usersCollection.find({})
// .then(data => console.log("USER COLLECTION", data))

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

// console.log(rootQueryObj);
// -------- Object Types ---------------

const RootQuery = new GraphQLObjectType({
 name: "RootQueryType",
 fields: rootQueryObj,
});

module.exports = new GraphQLSchema({
 query: RootQuery,
});
