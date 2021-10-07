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

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        //put file into school directory.
        const dir = './uploads/' + req.body.school;
        
        //make dir if it doesn't exist.
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{
                recursive: true
            })
        }

        //move file into directory
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        //generates universally unique identifier, and names the file.
        const ext = path.extname(file.originalname);
        const id = uuidv4()
        cb(null, id+ext)
    },
    fileFilter: (req,file,cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg" && ext !== ".mp4" && ext !== ".avi" && ext !== ".mov"){
            return cb(new Error('Only images and videos allowed.'))
        }
    }
})

//set port 
const PORT = 4000;

//import multer package for file upload.
const upload = multer({storage: fileStorageEngine})

//enable cors
app.use(cors());

//
app.use(express.static('./uploads'));

//graphql endpoint
app.use('/graphql', graphqlHTTP({
    schema: graphql_schema,
    rootValue: graphql_resolvers,
    graphiql: true
}))

//statically serve all files.
app.use("/:school/:file", (req, res, next)=>{
    if(req.params.file.includes('.jpg')){
        res.contentType('image/png');
    }
    if(req.params.file.includes('.mp4') || req.params.file.includes('.avi') || req.params.file.includes('.mov')){
        res.contentType('video/mp4');
    }
})



//rest endpoint to accept file upload.
app.put('/post-media-upload', upload.single('upload'), (req, res, next) => {
    res.send({file_path: req.file.filename});
})



app.listen(PORT, () => {
    console.log(`Application listing at http://localhost:${PORT}`);
})
