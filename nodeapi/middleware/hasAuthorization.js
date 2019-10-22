//const expressJwt = require("express-jwt");
const jwt    = require('jsonwebtoken')

require("dotenv").config();

const { User } = require('./../models/user');


let hasAuthorization = (req,res,next) => {

    const authorized = (req.profile) && (req.auth) && ( req.profile._id.equals(req.auth._id));

   // const authorized = req.profile._id.equals(req.auth._id) 

//     console.log("req.profile ", req.profile, " req.auth ", req.auth);
     console.log("req.profile ", req.profile._id, " req.auth ", req.auth._id);

     console.log("Authorized", authorized)
    //console.log("SAMEUSER", sameUser, "ADMINUSER", adminUser);

    if (!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    }
    next();

}


module.exports = { hasAuthorization }


