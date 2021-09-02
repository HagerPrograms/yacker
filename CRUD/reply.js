const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Upon creating a reply it must update the parent 'thread' object
async function createReply({ip}, thread, reply){
    const createReply = await prisma.reply.create({
        data: {
          author: ip,
          file_path: post.file,
          thread_id: thread.id,
          content: post.content
        },
      });
      const updateThread = await prisma.post.update({
        where: {
            id: thread.id,
        },
        data: {
            last_reply: Date.now()
        }
      })
};

//Deleting reply for debug
async function deleteReply(reply){
    const deleteReply = await prisma.reply.delete({
        where: {
            id: reply.id
        }
    })
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
            file_path: '/image/removed.jpg',
        }
    })
};