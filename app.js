const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');

const graphql_schema = require('./graphql/schema');
const graphql_resolvers = require('./graphql/resolvers');

const Post = require('./CRUD/post');

const PORT = 3000;

// const getPosts = async function() {
//     const posts = await Post.getPosts('New Mexico State University');
    
//     const normalized = posts.map(post => {
//         return {
//                 ...post,
//                 created_on: post.created_on.toISOString(),
//                 last_reply: post.last_reply.toISOString()};
//     })
    
//     console.log(normalized);
// }

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
