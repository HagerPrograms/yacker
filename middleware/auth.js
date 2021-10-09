const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    authHeader = req.headers.auth;

    console.log("Token :", req.headers.auth);

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
    next();
}
