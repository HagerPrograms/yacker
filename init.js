const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const {v4 : uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');

const { graphqlHTTP } = require('express-graphql');

const graphql_schema = require('./graphql/schema');
const graphql_resolvers = require('./graphql/resolvers');

const Post = require('./CRUD/post');
const User = require('./CRUD/user');
const Reply = require('./CRUD/reply');

Reply.createReply({masterID: '155', content:'test', file: null, author: '::1'})

async function init(){
    User.createAdmin("hagerprograms@gmail.com", "Sh@101698!", "::1");
    User.createAdmin("elotrujillo@yahoo.com","eloisgay", "::1");
}

init();