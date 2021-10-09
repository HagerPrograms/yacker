var { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type TestData{
        text: String!
        views: Int!
    }

    type Reply {
        author:      String
        created_on:  String!
        last_reply:  String!   
        id:          ID
        file_path:   String
        content:     String!
        report:      [ReplyReport!]!
    }

    type Post {
        author:      String
        created_on:  String!
        last_reply:  String!   
        id:          ID
        school:      String!
        file_path:   String!
        content:     String!
        reply:       [Reply!]!
        report:      [PostReport!]!
    }

    type User {
        address:   String!
        banned:    String!
        createdat: String!
        id:        ID!
    }

    type ReplyReport {
        author:    String!
        created_on: String!
        id:         ID!
        reply_ID:   ID
        content:    String!   
    }

    type PostReport {
        author:    String!
        created_on: String!
        id:         ID!
        post_ID:    ID
        content:    String!
    }

    type AuthData {
        token:  String!
        email:  String!
    }

    type Report {
        content:  String!
        masterID: String!
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

    input reportPostData{
        content:    String!
        author:     String!
        postID:     ID
    }

    input reportReplyData{
        content:    String!
        author:     String!
        replyID:    ID
    }



    type RootQuery {
        posts:                                    [Post!]!
        users:                                    [User!]!
        login(email: String!, password: String!): AuthData!
        getPosts(abbreviation: String!):          [Post!]!
        getPostReports:                           [Post!]!
        getReplyReports:                          [Reply!]!
    }

    type RootMutation{
        createPost  (postInput:  PostInputData):    Post!
        createReply (replyData:  ReplyInputData):   Reply!
        reportPost  (reportData: reportPostData):   Report!
        reportReply (reportData: reportReplyData):  Report!
    }

    schema {
        query:    RootQuery
        mutation: RootMutation
    }
`);