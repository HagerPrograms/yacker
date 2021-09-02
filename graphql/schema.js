var { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type TestData{
        text: String!
        views: Int!
    }
    
    type RootQuery {
        hello: TestData!
    }    

    type Post {
        author:      String!
        content:     String!
        created_at:  String!   
    }

    type AnotherQuery {
        post: Post!
    }

    schema {
        query: RootQuery
        query: AnotherQuery
    }
`);