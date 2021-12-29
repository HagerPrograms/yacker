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



function init(){
    console.log(env().ENCRYPTION_SECRET);
}

init();