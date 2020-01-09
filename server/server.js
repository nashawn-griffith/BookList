const express = require('express');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const port = process.env.PORT || 5000;

//connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(mongo =>
    console.log(`Database running. Connected to host ${mongo.connection.host}`)
  );

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
