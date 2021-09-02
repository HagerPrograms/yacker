const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');

const graphql_schema = require('./graphql/schema');
const graphql_resolvers = require('./graphql/resolvers');

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/graphql', graphqlHTTP({
    schema: graphql_schema,
    rootValue: graphql_resolvers,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Application listing at http://localhost:${PORT}`);
})