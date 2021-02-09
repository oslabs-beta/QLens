const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const fs = require("fs");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
 } = graphql;

// Connect to mongodb
const MongoClient = require("mongodb").MongoClient;
// Executing terminal commands using JS
const { exec } = require("child_process");



const mongoSchemaController = require('./controllers/mongoSchemaController')

console.log("SERVER RUNNING");
app.use(express.json());
app.use(cors());

// Getting mongodb uri from Frontend
app.post("/getURI", mongoSchemaController.createMongoSchema, (req, res, next) => {
  // Waiting for locals to be sent, then deleting schema.json file
  setTimeout(() => {
    console.log('this got deleted')
      fs.unlinkSync(path.join(__dirname, '../schema.json'))
  }, 2000)
})


const {graphqlHTTP} = require('express-graphql')
const schemaRoute = require('./schema')
console.log(schemaRoute)

app.use('/graphql', graphqlHTTP({ schema: schemaRoute, graphiql: true }))

// let schema;
// console.log('SERVER.JS========>', schema)

// app.use('/static', express.static(path.join(__dirname, '../src/public')));

// app.get('/', (req, res) => {
//     res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
//   });

//Post request to get the selectedSchemas from the front end submit button
app.post('/selectedSchemas', schemaRoute.converter.migrateSchema, (req, res) => {
  res.status(200).json({types: res.locals.types});
  console.log("ahhhhhhh", req.body.selectedSchemas)
  console.log("ahhhhhhh", req.body.uriId)
  //res.locals.rootQuery\
  // // scsch
})







app.listen(3000, () => console.log("listening on port 3000"));

