var { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type TestData{
        text: String!
        views: Int!
    }


    type Post {
        author:      String
        created_on:  String!
        last_reply:  String!   
        id:          ID
        school:      String!
        file_path:   String
        content:     String!
    }

    type User {
        address: String!
        banned: String!
        createdat: String!
        id: ID!
    }

    type AuthData {
        token:  String!
        email: String!
    }
    
    type RootQuery {
        posts:                                    [Post!]!
        users:                                    [User!]!
        login(email: String!, password: String!): AuthData!
        getPosts(abbreviation: String!):          [Post!]!
    }

    schema {
        query:   RootQuery
    }
`);