const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    const authHeader = (req.headers.authorization)?req.headers.authorization.split(' ')[1] : '';

    if(!authHeader) {
        console.log('No auth header');
        req.isAuth = false;
        return next();
    }
    const token = authHeader;
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'asupersecretsecret');
    } catch(err) {
        console.log(err);
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        console.log('No decoded token!');
        req.isAuth = false;
        return next();
    }
    
    req.userID = decodedToken.userID;
    req.isAuth = true;

    console.log(req.isAuth);

    next();
}
