const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//Create a user, once a new connection goes to Yacker, their IP is logged to the database.
async function createUser({ip}){
    const user = await prisma.users.create({
        data: {
          address: ip
        },
      })
};

//If a user breaks the rules of the website then they get banned.
async function banUser({ip}){
    const banUser = await prisma.users.update({
        where: {
          address: ip,
        },
        data: {
          banned: true,
        },
      })
};

//If a user appeals their ban sucessfully then they get unbanned.
async function unbanUser({ip}){
    const unbanUser = await prisma.users.update({
        where: {
          address: ip,
        },
        data: {
          banned: false,
        },
      })
};

//To read user information for debugging.
async function getUser({ip}){
    const user = await prisma.users.findUnique({
        where: {
          address: ip,
        },
      })
    console.dir(user, {depth: null});
};

//Delete user for debugging purposes
async function deleteUser({ip}){
    const deleteUser = await prisma.users.delete({
        where: {
          address: ip
        },
      })
};

exports.createUser = createUser;
exports.banUser = banUser;
exports.unbanUser = unbanUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;