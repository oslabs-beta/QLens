const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const schemaRoute = require('./schema');

const mongoSchemaController = require('./controllers/mongoSchemaController');

app.use(express.json());
app.use(cors());

// Getting mongodb uri from Frontend
app.post('/getURI', mongoSchemaController.createMongoSchema);

app.post(
  '/selectedSchemas',
  schemaRoute.converter.migrateSchema,
  (req, res) => {
    res.status(200).json({
      types: res.locals.types,
      queries: res.locals.queries,
      mutation: res.locals.mutations,
      mongoSchema: res.locals.mongoSchema,
    });
    app.use(
      '/graphql',
      graphqlHTTP({ schema: res.locals.convertedSchema, graphiql: true })
    );
  }
);

app.listen(3000, () => console.log('listening on port 3000'));
