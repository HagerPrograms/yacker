const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Create a post, takes ip and 
async function createPost({ip}, post){ 
    
    const createPost = await prisma.post.create({
        data: {
          author: ip,
          file_path: post.file,
          content: post.content,
          school: post.school
        },
    });
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

async function getPosts(school_url){
    const posts = await prisma.post.findMany({
        where:{
            school: {
                contains: school_url
            }
        }
    })
    return posts
}

async function getPost(post){
    const post = await prisma.post.findUnique({
        where:{
            id: post.id
        },
        include:{
            reply:true
        }
    })
    return post;
}

id: {
    contains: school_url
}