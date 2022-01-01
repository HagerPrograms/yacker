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
        author:            String!
        created_on:        String!
        report_id:         ID!
        reply_ID:          ID
        report_content:    String!   
    }

    type PostReport {
        author:            String!
        created_on:        String!
        report_id:         ID!
        post_ID:           ID
        report_content:    String!
    }

    type AuthData {
        token:  String!
        email:  String!
    }

    type Report {
        report_content:  String!
        masterID: String!
    }

    type TopData{
        id:       ID
        school:   String!
        content:  String!
    }
    
    input PostInputData{
        content:   String!
        school:    String!
        file_path: String!
        captcha:   String!
    }

    input ReplyInputData{
        content:   String!
        school:    String!
        file_path: String
        masterID:  String!
        captcha:   String!
    }

    input reportPostData{
        content:    String!
        postID:     ID
        captcha:    String!
    }

    input reportReplyData{
        content:    String!
        replyID:    ID
        captcha:    String!
    }

    type RootQuery {
        posts:                                      [Post!]!
        users:                                      [User!]!
        login(email: String!, password: String!):   AuthData!
        getPosts(abbreviation: String!):            [Post!]!
        getPost(postID: String!, school: String!):  Post
        getPostReports:                             [Post!]!
        getTop:                                     [TopData!]!
        getReplyReports:                            [Reply!]!
        isAdmin:                                    Boolean!
    }

    type RootMutation{
        createPost     (postInput:  PostInputData): Post!
        createReply   (replyData:  ReplyInputData): Reply!
        reportPost    (reportData: reportPostData): Report!
        reportReply  (reportData: reportReplyData): Report!
        banUser                      (ip: String!): String!
        unbanUser                    (ip: String!): String!
        closePost                    (postID: ID!): String!
        closeReply                  (replyID: ID!): String!                               
    }

    schema {
        query:    RootQuery
        mutation: RootMutation
    }
`);