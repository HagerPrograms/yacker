const { PrismaClient } = require('@prisma/client');
const { parse } = require('graphql');

const prisma = new PrismaClient()

//Upon creating a reply it must update the parent 'thread' object
async function createReply({author, file_path, masterID, content}){

    const createReply = await prisma.reply.create({
        data: {
          author:    author,
          file_path: file_path,
          thread_id: parseInt(masterID),
          content:   content
        },
      });

    const updateThread = await prisma.post.update({
        where: {
            id: parseInt(masterID),
        },
        data: {
            last_reply: new Date(Date.now()),
        }
      })
    return createReply;
};

//Deleting reply for debug
async function deleteReply(id){
    const replyID = parseInt(id);
    console.log("ID", replyID)
    const deletePost = await prisma.$executeRaw`DELETE FROM reply WHERE id=${replyID}`
    console.log(deletePost);
};

//Delete all replies created by an user.
async function deleteAllReplies(user){
    const deleteAllReplies = await prisma.reply.deleteMany({
        where: {
            contains :{
                author: user.address
            }
        }
    })
};

//Mute reply if reply is in violation of rules
async function muteReply(reply){
    const muteReply = await prisma.reply.update({
        where: {
            id: reply.id
        },
        data: {
            file_path: '/image/removed.jpg',
            content: 'This reply\'s content has been removed.'
        }
    })
};

async function getReplyReports(){
    const replies = await prisma.reply.findMany({
        where:{
            reply_report: {
                some: {

                }
            }
            },
        include: {
            reply_report: true,
        }
    })
    return replies
}

//Mute content if comment is in violation of the rules
async function muteContent(reply){
    const muteContent = await prisma.reply.update({
        where: {
            id: reply.id
        },
        data: {
            content: 'This reply\'s content has been removed.'
        }
    })
};

//Mute media if it is in violation of the rules.
async function muteMedia(reply){
    const muteMedia = await prisma.reply.update({
        where: {
            id: reply.id
        },
        data: {
            file_path: '',
        }
    })
};



exports.getReplyReports = getReplyReports;
exports.createReply = createReply;
exports.muteReply = muteReply;
exports.deleteAllReplies = deleteAllReplies;
exports.deleteReply = deleteReply;
exports.muteContent = muteContent;
exports.muteMedia = muteMedia;