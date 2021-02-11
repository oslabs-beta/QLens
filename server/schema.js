const graphql = require("graphql");
var cloneDeep = require("lodash.clonedeep");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const {
 GraphQLObjectType,
 GraphQLString,
 GraphQLSchema,
 GraphQLID,
 GraphQLInt,
 GraphQLList,
 GraphQLNonNull
} = graphql;

const converter = {}
let rootQueryObj = {};

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
   break;
  case value.type.includes("string"):
   fieldsObj[key] = { type: GraphQLString };
   mutationObj[key] = { type: new GraphQLNonNull(GraphQLString) };
   strFieldsObj[key] = `{ type: GraphQLString }`;
   changeMutationtoString[key] = `{ type: new GraphQLNonNull(GraphQLString) `;
   break;
  case value.type.includes("Array"):
   fieldsObj[key] = { type: new GraphQLList(GraphQLString) };
   mutationObj[key] = { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) };
   strFieldsObj[key] = `{ type: GraphQLString }`;
   changeMutationtoString[key] = `{  type: new GraphQLNonNull(new GraphQLList(GraphQLString)) } `;
   break;
  case value.type.includes("number"):
   fieldsObj[key] = { type: GraphQLInt };
   mutationObj[key] = { type: new GraphQLNonNull(GraphQLInt) };
   strFieldsObj[key] = `{ type: GraphQLInt }`;
   changeMutationtoString[key] = `{ type: new GraphQLNonNull(GraphQLInt) `;
   break;
  case value.type.includes("Object"):
   fieldsObj[key] = { type: GraphQLObjectType };
   mutationObj[key] = { type: new GraphQLNonNull(GraphQLObjectType) };
   strFieldsObj[key] = `{ type: GraphQLObjectType }`;
   changeMutationtoString[key] = `{ type: new GraphQLNonNull(GraphQLObjectType) `;
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
let stringObj = {};
let strFieldsObj = {};

let mutationObj = {}
let mutationObjStr = {}
let changeMutationtoString = {}

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
 const mutationDeep = cloneDeep(changeMutationtoString)

 // Dynamically creating graphql object types
 obj[capitalize(`${property}Type`)] = new GraphQLObjectType({
  name: capitalize(property),
  fields: () => deep,
 });

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

 //======================= CREATING MUTATION =======================

 let listOfProperties = {}
 Object.keys(data[property]).filter(key => key !== '_id' && key !== "__v").forEach(el => {
  listOfProperties[el] = `args.${el}`
 })
 console.log('LIST OF PROPERTIESSSSSSSSSSSS===============', listOfProperties)
 
 mutationObjStr[property] =
 `   add${capitalize(property)} : {\n` +
 `     type: ${capitalize(`${property}Type`)}\n` +
 `     args: { ` +
 `     ${JSON.stringify(mutationDeep)}\n`+
 `     resolve(parent, args) {\n`+
 `        let ${property} = new ${capitalize(property)} (\n`+
 `        ${JSON.stringify(listOfProperties)}) \n`+
 `     return ${property}.save() \n` +
 `     } \n` +
 `    } \n` +
 `   } \n`
 
 
 let mutationSchema =  `const Mutation = new GraphQLObjectType({\n` +
                      `   name: 'Mutation, \n` +
                      `   fields: ${Object.values(mutationObjStr)}` 

 //=====================================================================

 // resetting the fieldsObject
 console.log('this is stringObj ====>', strFieldsObj);
 console.log('this is mutationObj ====>', mutationSchema);

 fieldsObj = {};
 strFieldsObj = {};
}
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: rootQueryObj,
 })

 res.locals.types = stringObj
 res.locals.mutations = changeMutationtoString

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


