const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Create a post, takes ip and 
async function createPost({ip,file,content,school}){ 
    
    const createdPost = await prisma.post.create({
        data: {
          author: ip,
          file_path: file,
          content: content,
          school: school
        },
    });

    return createdPost;
};

async function deletePost(post){
    const deletePost = await prisma.post.delete({
        where: {
            id: post.id
        }
    })
};

async function deleteAllPosts(user){
    const deleteAllPosts = await prisma.post.deleteMany({
        where: {
            contains :{
                author: user.address
            }
        }
    })
};

async function mutePost(post){
    const mutePost = await prisma.post.update({
        where: {
            id: post.id
        },
        data: {
            file_path: '/image/removed.jpg',
            content: 'This post\'s content has been removed.'
        }
    })
};

async function muteContent(post){
    const muteContent = await prisma.post.update({
        where: {
            id: post.id
        },
        data: {
            content: 'This post\'s content has been removed.'
        }
    })
};

async function muteMedia(post){
    const muteMedia = await prisma.post.update({
        where: {
            id: post.id
        },
        data: {
            file_path: '/image/removed.jpg',
        }
    })
};

async function getPosts(school_abrv){
    const posts = await prisma.post.findMany({
        where:{
            school: {
                contains: school_abrv
            }
        }
    })
    return posts
}

async function getPost(post_id){
    const post = await prisma.post.findUnique({
        where:{
            id: post_id
        },
        include:{
            reply:true
        }
    })
    return post;
}


exports.createPost = createPost;
exports.mutePost = mutePost;
exports.deleteAllPosts = deleteAllPosts;
exports.getPost = getPost;
exports.getPosts = getPosts
exports.muteContent = muteContent;
exports.deletePost = deletePost;
exports.muteMedia = muteMedia;