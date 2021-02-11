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
 GraphQLNonNull
} = graphql;



const converter = {}
let rootQueryObj = {};


// let rootQuery;

function addWhiteSpace(number) {
  let whiteSpace = ' ';
  for (let i = 0; i < number; i+=1) {
    whiteSpace += ' ';
  }
  return whiteSpace;
}

converter.migrateSchema = (req, res, next) => {
const url = req.body.uriId;
const data = req.body.selectedSchemas
const getGraphQlType = (key, value) => {
  switch (true) {
   case key.includes("__v"):
    break;
   case key.includes("_id"):
    fieldsObj[key] = { type: GraphQLID };
    strFields += `${addWhiteSpace(4)}${key}: { type: GraphQLID },|`;
    break;
   case value.type.includes("string"):
    fieldsObj[key] = { type: GraphQLString };
    mutationObj[key] = { type: new GraphQLNonNull(GraphQLString) };
    strFields += `${addWhiteSpace(4)}${key}:{ type: GraphQLString },|`;
    mutationToString += `${addWhiteSpace(8)}${key}: { type: new GraphQLNonNull(GraphQLString) },|`;
    break;
   case value.type.includes("Array"):
    fieldsObj[key] = { type: new GraphQLList(GraphQLString) };
    mutationObj[key] = { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) };
    strFields += `${addWhiteSpace(4)}${key}:{ type: GraphQLString },|`;
    mutationToString += `${addWhiteSpace(8)}${key}: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },|`;
    break;
   case value.type.includes("number"):
    fieldsObj[key] = { type: GraphQLInt };
    mutationObj[key] = { type: new GraphQLNonNull(GraphQLInt) };
    strFields += `${addWhiteSpace(4)}${key}:{ type: GraphQLInt },|`;
    mutationToString += `${addWhiteSpace(8)}${key}: { type: new GraphQLNonNull(GraphQLInt) },|`;
    break;
   case value.type.includes("Object"):
    fieldsObj[key] = { type: GraphQLObjectType };
    mutationObj[key] = { type: new GraphQLNonNull(GraphQLObjectType) };
    strFields += `${addWhiteSpace(4)}${key}:{ type: GraphQLObjectType },|`;
    mutationToString += `${addWhiteSpace(8)}${key}: { type: new GraphQLNonNull(GraphQLObjectType) },|`;
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
let strFields = '';
let stringObj = {};
let rootQueryStr = '';
let sendRootQueryObj = {};
let mutationObj = {}
let mutationObjStr = ''
let mutationToString = ''
let mutationSchema;

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
  console.log('DATABASSSSUUUUUU', url)
  const databaseString = databaseName.join('').slice(1, databaseName.join('').length - 1)
  console.log('DATABASSSSUUUUUU2222222', databaseString)

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
//  const strDeep = cloneDeep(strFieldsObj)
//  const mutationDeep = cloneDeep(MutationtoString)


 // Dynamically creating graphql object types
 obj[capitalize(`${property}Type`)] = new GraphQLObjectType({
  name: capitalize(property),
  fields: () => deep,
 });

 // formats the graphQL schema to send to the front end
 stringObj[property] = `const ${capitalize(`${property}Type`)} = new GraphQLObjectType({\n` +
                       `${addWhiteSpace(2)}name: '${capitalize(property)}',\n` +
                       `${addWhiteSpace(2)}fields: () => ({\n` +
                       `${strFields}`+
                       `${addWhiteSpace(2)}})${addWhiteSpace(1)}\n` +
                       `});${addWhiteSpace(1)}\n`
// dynamically creating fields object in rootQueryType
 rootQueryObj[property] = {
  type: new GraphQLList(obj[capitalize(`${property}Type`)]),
  resolve: function resolve(parent, args) {
    // replace with Find() method Based on your file structure/imports
    return run()
  },
 };

  //======================= CREATING MUTATION =======================

  let listOfProperties = '';
  Object.keys(data[property]).filter(key => key !== '_id' && key !== "__v").forEach(el => {
   listOfProperties += `${el}: args.${el},|${addWhiteSpace(10)}`
  })
  // console.log('LIST OF PROPERTIESSSSSSSSSSSS===============', listOfProperties)

  mutationObjStr +=
  `   add${capitalize(property)} : {|` +
  `      type: ${capitalize(`${property}Type`)},|` +
  `      args: {|` +
  `${mutationToString}`+
  `${addWhiteSpace(6)}},|`+
  `${addWhiteSpace(6)}resolve(parent, args) {|`+
  `${addWhiteSpace(8)}let ${property} = new ${capitalize(property)} ({|`+
  `${addWhiteSpace(10)}${JSON.stringify(listOfProperties)}` +
  `});|`+
  `${addWhiteSpace(8)}return ${property}.save(); |` +
  `        } |` +
  `      } |` +
  `    }, |`



  mutationSchema =  `const Mutation = new GraphQLObjectType({|` +
                       `${addWhiteSpace(2)}name: 'Mutation', |` +
                       `${addWhiteSpace(2)}fields: {|${mutationObjStr}|)};`

  //=====================================================================



 rootQueryStr += `   ${pluralize.singular(property)}: {|` +
                          `${addWhiteSpace(6)}type: ${capitalize(`${property}Type`)},|`+
                          `${addWhiteSpace(6)}args: { id: { type: GraphQLID }},|` +
                          `${addWhiteSpace(6)}resolve(parent, args) {|` +
                          `${addWhiteSpace(8)}return ${capitalize(pluralize.singular(property))}.findById(args.id);|` +
                          `${addWhiteSpace(6)}} |` +
                          `${addWhiteSpace(4)}},|`

 rootQueryStr += `${`${addWhiteSpace(4)}${property}`}: {|` +
                            `${addWhiteSpace(6)}type: new GraphQLList(${capitalize(`${property}Type`)}),|` +
                            `${addWhiteSpace(6)}resolve(parent, args) {|` +
                            `${addWhiteSpace(8)}return ${capitalize(pluralize.singular(property))}.find({});|`+
                            `${addWhiteSpace(6)}}|` +
                            `${addWhiteSpace(4)}},|`



 // resetting the fieldsObject
 //  console.log('this is stringObj ====>', strFieldsObj);
 fieldsObj = {};
 strFields = '';
 mutationObjStr = '';
 mutationToString = '';
}

sendRootQueryObj.queries = `const RootQuery = new GraphQLObjectType({|` +
                            `  name: "RootQueryType",|` +
                            `  fields: { | ${rootQueryStr}  }|});|`



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: rootQueryObj,
 })

 console.log('  inside------------------', RootQuery)
 console.log('  inside ROOTQUERYOBJ', rootQueryObj)


 res.locals.types = stringObj;
 res.locals.queries = sendRootQueryObj;
 res.locals.mutations = mutationSchema;


 res.locals.convertedSchema = new GraphQLSchema({
  query: RootQuery
 })

 next()
}


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: rootQueryObj,
 });

module.exports = {
  converter,
  schema: new GraphQLSchema({
   query: RootQuery
  })
}



// put comma on line 21 of codemirrror
// add closing bracket to line 28 of codemirror