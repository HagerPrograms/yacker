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

const env = require('./env')

const Post = require('./CRUD/post');
const User = require('./CRUD/user');
const Reply = require('./CRUD/reply');



async function init(){
    if(!env().ADMIN_0){
        throw new Error ("ENVIRONMENT VARIABLES NOT SET!")
    }
    if(!env().ADMIN_1){
        throw new Error ("ENVIRONMENT VARIABLES NOT SET!")
    }
    if(!env().PASSWORD_0){
        throw new Error ("ENVIRONMENT VARIABLES NOT SET!")
    }
    if(!env().PASSWORD_1){
        throw new Error ("ENVIRONMENT VARIABLES NOT SET!")
    }

    User.createAdmin(env().ADMIN_0, env().PASSWORD_0, "0.0.0.0").catch((e) => {throw new Error("Account already exists!")})
    User.createAdmin(env().ADMIN_1, env().PASSWORD_1, "0.0.0.0").catch((e) => {throw new Error("Account already exists!")})

}

init();