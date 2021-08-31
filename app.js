const user = require('./CRUD/user');
// const post = require('./CRUD/post');
// const reply = require('./CRUD/reply');
// const report = require('./CRUD/report');
async function init(){
    await user.deleteUser({ip:'198.168.2.1'});
    await user.createUser({ip:'198.168.2.1'});
    await user.banUser({ip:'198.168.2.1'});
    await user.getUser({ip:'198.168.2.1'});
    await user.unbanUser({ip:'198.168.2.1'});
    await user.getUser({ip:'198.168.2.1'});
}

init();