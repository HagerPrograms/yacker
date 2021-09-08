//import dev created libraries
const { graphql } = require('graphql');
const Post = require('../CRUD/post');
const Reply = require('../CRUD/reply');
const Report = require('../CRUD/report');
const User = require('../CRUD/user');

module.exports = {
    hello(){
        return {
            text: 'Hello World!',
            views: 11023
        };
    },

    posts: async function(){
        const posts = await Post.getPosts('New Mexico State University');
        
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

    users: async function() {
        const users = await User.getUsers();
        const usersMapped = users.map(u => {
            return {
            address: u.address.toString()}
        })
        return usersMapped
    }
}