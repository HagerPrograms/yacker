//import dev created libraries
const { graphql } =  require('graphql');
const Post =         require('../CRUD/post');
const Reply =        require('../CRUD/reply');
const ReportPost =   require('../CRUD/postReport');
const ReportReply =  require('../CRUD/replyReport');
const User =         require('../CRUD/user');

const bcrypt =       require('bcrypt');
const jwt =          require('jsonwebtoken');

module.exports = {

    //Fetches posts for certain school.
    posts: async function(){
        //fetch posts from database
        const posts = await Post.getPosts('New Mexico State University');
        
        //Map all users so that graphql will accept the data
        const graphqlArray = posts.map(p => {
            return {
                ...p,
                author: p.author.toString(),
                created_on: p.created_on.toISOString(),
                last_reply: p.last_reply.toISOString()
            };
        })

        return graphqlArray
    },
    
    //Fetches all user IPs
    users: async function() {
        //fetch users from User table
        const users = await User.getUsers();
        //Map all users so that graphql will accept the data
        const usersMapped = users.map(u => {
            return {
            ...u,
            address: u.address.toString(),
            createdat: u.createdat.toISOString()}
        })
        
        return usersMapped
    },

    login: async function ({email, password}, req ){

        const admin = await User.getAdmin(email);
        //checks if user exists
        if(!admin){
            const error = new Error('User not found!')
            error.code = 401;
            throw error;
        }
        //compares user passwords
        const isEqual = await bcrypt.compare(password, admin.password);
        
        //if the password is incorrect it throws an error
        if(!isEqual){
            const error = new Error('Incorrect password!');
            error.code = 401;
            throw error;
        }
        
        //create a json web token upon correct credentials.
        const token = jwt.sign(
        {
            email: admin.email,
        },
        'asupersecretsecret',
        {expiresIn: '24h'} //new tokens required in a day.
        );

        return {
            token: token,
            email: email
        }
    },
    
    getPosts: async function ({abbreviation}, req) {
        console.log("User authenication status: ", req.isAuth);
        
        const posts = await Post.getPosts(abbreviation);

        posts.sort((a,b) => {
            return b.last_reply - a.last_reply;
        })

        const graphqlArray = posts.map(p => {
            return {
                ...p,
                author: p.author.toString(),
                created_on: p.created_on.toISOString(),
                last_reply: p.last_reply.toISOString()
            };
        })
        return graphqlArray;
    },

    createPost: async function({ postInput }, req) {
        const errors = [];
        
        const user = await User.getUser(req.socket.remoteAddress)

        if(!user){
            const user = await User.createUser(req.socket.remoteAddress)
        }

        if(user.banned === true){
            errors.push("User is banned");
            return {
                author: req.socket.remoteAddress,
                filepath: '',
                created_on: '',
                last_reply: '',
                id: null,
                school: '',
                content: '',
                replies: []
            }
        }

        //Input errors
        if(postInput.filepath === ''){
            errors.push("No picture/video uploaded.")
        }

        if(postInput.content == ''){
            errors.push("Post content is empty!")
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        //if no errors sucessful post
        const createdPost = await Post.createPost({
            ip: req.socket.remoteAddress,
            content: postInput.content,
            file: postInput.file_path,
            school: postInput.school
            })        

        return{    
            ...createdPost,
            author: createdPost.ip,
            created_on: createdPost.created_on.toISOString(),
            last_reply: createdPost.last_reply.toISOString()
            
        }
        },

    createReply: async function({replyData}, req){
        const errors = [];

        console.log("ReplyData: ", replyData);
        const user = await User.getUser(req.socket.remoteAddress)

        const ip = req.socket.remoteAddress;

        if(!user){
            user = await User.createUser(req.socket.remoteAddress)
        }

        if(user.banned){
            const error = new Error('User is banned!');
            throw error;
        }


        if(replyData.content == ''){
            errors.push("Reply content is empty!")
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }

        const createdReply = await Reply.createReply(
            {
                masterID:  replyData.masterID,
                content:   replyData.content,
                file_path: replyData.file_path,
                author:    ip
            })
        
        return {
            ...createdReply,
            author: createdReply.ip,
            created_on: createdReply.created_on.toISOString()
        }   
    },
    reportPost: async function ({reportData}, req){
        const errors = [];

        //console.log("ReplyData: ", replyData);
        const user = await User.getUser(req.socket.remoteAddress)
        console.log("Report Data: ", reportData);
        const ip = req.socket.remoteAddress;

        if(!user){
            user = await User.createUser(req.socket.remoteAddress)
            console.log("HERE 1");
        }

        if(user.banned){
            const error = new Error('User is banned!');
            console.log("HERE 1");
            throw error;
        }

        if(reportData.content == ''){
            errors.push("Report content is empty.")
            console.log("HERE 1");
        }

        if(reportData.postID === null){
            const error = new Error('Invalid Report');
            console.log("HERE 1");
            throw error
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        const createdReport = await ReportPost.createPostReport(ip, {
            content: reportData.content,
            postID: reportData.postID,
        })

        console.log("Insertion complete: ", createdReport);

        return {
            ...createdReport,
            content: createdReport.report_content,
            created_on: createdReport.created_on.toISOString(),
        }
    },
    reportReply: async function ({reportData}, req){
        const errors = [];

        console.log("ReplyData: ", reportData);
        const user = await User.getUser(req.socket.remoteAddress)
        const ip = req.socket.remoteAddress;

        if(!user){
            console.log("HERER 1");
            user = await User.createUser(req.socket.remoteAddress)
        }

        if(user.banned){
            const error = new Error('User is banned!');
            console.log("HERER 2");
            throw error;
        }

        if(reportData.content == ''){
            errors.push("Report content is empty.")
            console.log("HERER 3");
            throw error;
        }

        if(reportData.replyID === null){
            const error = new Error('Invalid Report');
            console.log("HERER 4");
            throw error
        }

        if(errors.length > 0){
            console.log("HERER 5");
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
        
        console.log("REPLY REPORT DATA", reportData);

        const createdReport = await ReportReply.createReplyReport(ip, {
            content: reportData.content,
            replyID: reportData.replyID,
        })

        console.log("Insertion complete: ", createdReport);

        return {
            ...createdReport,
        }
    },

    getPostReports: async function (data, req) {
        
        if(!req.isAuth){
            throw new Error('User is not authorized.')
        }

        const posts = await Post.getPostReports();

        console.log('Reported posts: ', posts);

        const graphqlArray = posts.map(p => {
            return {
                ...p,
                report: p.post_report,
                author: p.author.toString(),
                created_on: p.created_on.toISOString(),
                last_reply: p.last_reply.toISOString()
            };
        })

        return graphqlArray;
    },

    getReplyReports: async function (data, req) {
        
        console.log("HERE");

        if(!req.isAuth){
            throw new Error('User is not authorized.')
        }

        const replies = await Reply.getReplyReports();


        const ip = req.socket.remoteAddress;

        console.log("REPLIES", replies)

        const graphqlArray = replies.map(r => {
            return {
                ...r,
                report: r.reply_report,
                author: r.author.toString(),
                created_on: r.created_on.toISOString(),
                last_reply: r.last_reply.toISOString()
            };
        })

        return graphqlArray;
    },

    isAdmin: (data, req) => {
        return req.isAuth;
    },

    banUser: async function ({ip}, req){
        const bannedUser = await User.banUser(ip);
        return `Banned user ${ip}`
    },
    
    unbanUser: async function ({ip}, req){
        const unbannedUser = await User.unbanUser(ip);
        return `Unbanned user ${ip}`
    },
    closePost: async function ({postID}, req){
        const post = await Post.deletePost(postID);
        return `Closed thread ${postID}`;
    },

    closeReply: async function ({replyID}, req){
        const reply = await Reply.deleteReply(replyID);
        return `Closed reply ${replyID}`;
    },
    
    // muteThreadMedia: async function ({ip}, req){
    //     const bannedUser = await User.banUser(ip);
    //     return `Banned user ${ip}`
    // },

    // muteReply: async function ({ip}, req){
    //     const bannedUser = await User.banUser(ip);
    //     return `Banned user ${ip}`
    // },
    
    // muteReplyMedia: async function ({ip}, req){
    //     const bannedUser = await User.banUser(ip);
    //     return `Banned user ${ip}`
    // },
}