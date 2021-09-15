//import dev created libraries
const { graphql } = require('graphql');
const Post = require('../CRUD/post');
const Reply = require('../CRUD/reply');
const Report = require('../CRUD/report');
const User = require('../CRUD/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    login: async function ({email, password}){

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
        {expiresIn: '1h'} //new tokens required in an hour.
        );

        console.log(token);

        return {
            token: token,
            email: email
        }
    },
    
    getPosts: async function ({abbreviation}) {
        const posts = await Post.getPosts(abbreviation);

        posts.sort((a,b) => {
            return b.date - a.date;
        })

        const graphqlArray = posts.map(p => {
            return {
                ...p,
                author: p.author.toString(),
                created_on: p.created_on.toISOString(),
                last_reply: p.last_reply.toISOString()
            };
        })

        console.log(posts);

        return graphqlArray;
    }
}