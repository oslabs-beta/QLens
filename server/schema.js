const graphql = require("graphql");
var cloneDeep = require("lodash.clonedeep");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
var pluralize = require('pluralize')

const {
 GraphQLObjectType,
 GraphQLString,
 GraphQLSchema,
 GraphQLID,
 GraphQLInt,
 GraphQLList,
} = graphql;



const converter = {}
let rootQueryObj = {};


// let rootQuery;

converter.migrateSchema = (req, res, next) => {
const url = req.body.uriId;
const data = req.body.selectedSchemas
const getGraphQlType = (key, value) => {
 switch (true) {
  case key.includes("__v"):
   break;
  case key.includes("_id"):
   fieldsObj[key] = { type: GraphQLID };
   strFieldsObj[key] = `{ type:GraphQLID }`;
  //  strFieldsObj[key] = {type:`${GraphQLID}`;
   break;
  case value.type.includes("string"):
   fieldsObj[key] = { type: GraphQLString };
   strFieldsObj[`|${key}`] = `{ type: GraphQLString }`;
   break;
  case value.type.includes("Array"):
   fieldsObj[key] = { type: new GraphQLList(GraphQLString) };
   strFieldsObj[key] = `|{ type: GraphQLString }`;
   break;
  case value.type.includes("number"):
   fieldsObj[key] = { type: GraphQLInt };
   strFieldsObj[key] = `|{ type: GraphQLInt }`;
   break;
  case value.type.includes("Object"):
   fieldsObj[key] = { type: GraphQLObjectType };
   strFieldsObj[key] = `|{ type: GraphQLObjectType }`;
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
let strFieldsObj = {};
let stringObj = {};
let strRootQueryObj = {};
let sendRootQueryObj = {};
for (const property in data) {
 for (const [key, value] of Object.entries(data[property])) {
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
 const strDeep = cloneDeep(strFieldsObj)

 // Dynamically creating graphql object types
 obj[capitalize(`${property}Type`)] = new GraphQLObjectType({
  name: capitalize(property),
  fields: () => deep,
 });

 // formats the graphQL schema to send to the front end
 stringObj[property] = `const ${capitalize(`${property}Type`)} = new GraphQLObjectType({\n` +
                       `   name: '${capitalize(property)}',\n` +
                       `   fields: () => (\n` +
                       `     ${JSON.stringify(strDeep)}\n`+
                       `   ) \n` +
                       `}) \n`
// dynamically creating fields object in rootQueryType
 rootQueryObj[property] = {
  type: new GraphQLList(obj[capitalize(`${property}Type`)]),
  resolve: function resolve(parent, args) {
    // replace with Find() method Based on your file structure/imports
    return run()
  },
 };



 strRootQueryObj[pluralize.singular(property)] = `{|` +
                          `       type: ${capitalize(`${property}Type`)},|`+
                          `       args: { id: { type: GraphQLID }},|` +
                          `       resolve(parent, args) {|` +
                          `         return ${capitalize(pluralize.singular(property))}.findById(args.id);|` +
                          `       } |` +
                          `     }|`

 strRootQueryObj[`   ${property}`] = `{|` +
                            `       type: new GraphQLList(${capitalize(`${property}Type`)}),|` +
                            `       resolve(parent, args) {|` +
                            `         return ${capitalize(pluralize.singular(property))}.find({});|`+
                            `       }|` +
                            `     },|`



 // resetting the fieldsObject
 //  console.log('this is stringObj ====>', strFieldsObj);
 fieldsObj = {};
 strFieldsObj = {};
}

sendRootQueryObj.queries = ` const RootQuery = new GraphQLObjectType({\n` +
                            `   name: "RootQueryType",\n ` +
                            `   fields: ${JSON.stringify(strRootQueryObj)});|`

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: rootQueryObj,
 })

 res.locals.types = stringObj;
 res.locals.queries = sendRootQueryObj;
 next()
}


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: rootQueryObj,
 });

module.exports = {
  converter,
  schema: new GraphQLSchema({
   query: RootQuery,
  })
}


