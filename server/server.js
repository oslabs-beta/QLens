const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const fs = require("fs");
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
const schema = require('./schema')

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))


// app.use('/dist', express.static(path.join(__dirname, '../dist')));

// app.get('/', (req, res) => {
//     res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
//   });


//Post request to get the selectedSchemas from the front end submit button
app.post('/selectedSchemas', (req, res) => {
  res.status(200);
  console.log(req.body.selectedSchemas);
  console.log(req.body.uriData);
})





app.listen(3000, () => console.log("listening on port 3000"));
