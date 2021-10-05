const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const {v4 : uuidv4} = require('uuid');
const fs = require('fs');

const { graphqlHTTP } = require('express-graphql');

const graphql_schema = require('./graphql/schema');
const graphql_resolvers = require('./graphql/resolvers');

const Post = require('./CRUD/post');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads/' + req.body.school;
        
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{
                recursive: true
            })
        }
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        const id = uuidv4()
        cb(null, id)
    }
})

//set port 
const PORT = 4000;

//import multer package for file upload.
const upload = multer({storage: fileStorageEngine})

//enable cors
app.use(cors());

//rest endpoint to accept file upload.
app.put('/post-media-upload', upload.single('upload'), (req, res, next) => {
    console.log(req.body.school);
    console.log(req.file.filename);
    res.send({file_path: req.file.filename});
})

//graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: graphql_schema,
    rootValue: graphql_resolvers,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Application listing at http://localhost:${PORT}`);
})
