//const expressJwt = require("express-jwt");
const jwt    = require('jsonwebtoken')

require("dotenv").config();

const { User } = require('./../models/user');


let auth = (req,res,next) => {
/*    let token = req.cookies['w_auth'] || req.body.token || req.query.token || req.headers.authorization;
    
    if (token.StartsWith("Bearer "))
    {
    token = token.Substring("Bearer ".Length);

    }*/
    if (!req.headers.authorization) {
    return res.status(403).send({
        isAuth: false,
        message: 'No token provided'
    });
  }

   let bearertoken =req.headers.authorization
   let tokenArray = bearertoken.split(" ");
   let token = tokenArray[1];

    //let token = req.headers.get('authorization')
    console.log("token", token);

    //.Substring("Bearer ".Length);

    if (!token) {
    return res.status(403).send({
        isAuth: false,
        message: 'No token provided'
    });
  }
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: "No auth",
            token: token
        });
      console.log("Found user")

//        req.token = token;
        req.auth = user;
        next();
    })

}


module.exports = { auth }


