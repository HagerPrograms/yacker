var { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type TestData{
        text: String!
        views: Int!
    }

    type Reply {
        created_on:  String!
        last_reply:  String!   
        id:          ID
        school:      String!
        file_path:   String!
        content:     String!
    }

    type Post {
        author:      String!
        created_on:  String!
        last_reply:  String!   
        id:          ID
        school:      String!
        file_path:   String!
        content:     String!
        replies:     [Reply!]!
    }

    type User {
        address:   String!
        banned:    String!
        createdat: String!
        id:        ID!
    }

    type AuthData {
        token:  String!
        email:  String!
    }
    
    input PostInputData{
        content:   String!
        school:    String!
        file_path: String!
    }

    input ReplyInputData{
        content:   String!
        school:    String!
        file_path: String
        masterID:  String!
    }

    type RootQuery {
        posts:                                    [Post!]!
        users:                                    [User!]!
        login(email: String!, password: String!): AuthData!
        getPosts(abbreviation: String!):          [Post!]!
    }

    type RootMutation{
        createPost  (postInput:  PostInputData):  Post!
        createReply (replyData:  ReplyInputData): Reply!
    }

    schema {
        query:    RootQuery
        mutation: RootMutation
    }
`);