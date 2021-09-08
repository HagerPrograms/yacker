var { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type TestData{
        text: String!
        views: Int!
    }

    type Admin{
        _id: ID!
        name: String!
        email: String!
        password: String
    }

    input AdminData{
        email: String!
        password: String!
    }

    type Post {
        author:      String!
        created_on:  String!
        last_reply:  String!   
        id:          ID
        school:      String!
        file_path:   String
        content:     String!
    }

    type User {
        address: String!
    }
    
    type RootQuery {
        posts: [Post!]!
        users: [User!]!
    }

    type RootMutation{
        createAdmin(adminInput)
        deleteAdmin
        banUser
        unbanUser
    }

    schema {
        query:    RootQuery
        mutation: 
    }
`);