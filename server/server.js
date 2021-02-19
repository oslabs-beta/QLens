const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const fs = require("fs");

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



// let schema;
// console.log('SERVER.JS========>', schema)

// app.use('/static', express.static(path.join(__dirname, '../src/public')));

// app.get('/', (req, res) => {
  //     res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
  //   });

  global.convertedGraphQlSchema = '';
  //Post request to get the selectedSchemas from the front end submit button
  // const testing = (req, res, next) => {
  //   app.use('/graphql', graphqlHTTP({ schema: global.convertedGraphQlSchema, graphiql: true }), (req, res, next) => {
  //     next()
  //   })
  // }

  app.post('/selectedSchemas', schemaRoute.converter.migrateSchema, (req, res) => {
    global.convertedGraphQlSchema = res.locals.convertedSchema
    res.status(200).json({types: res.locals.types, queries: res.locals.queries, mutation: res.locals.mutations, mongoSchema: res.locals.mongoSchema});
    // console.dir('Jake loves this schema ======>', res.locals.convertedSchema);
    // console.dir('GLOBALLLLLLLLLLLLLLLLLLLLLLLL', global.convertedGraphQlSchema)
    app.use('/graphql', graphqlHTTP({ schema: res.locals.convertedSchema, graphiql: true }))
})

app.listen(3000, () => console.log("listening on port 3000"));

