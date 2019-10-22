const express = require("express");
const {
    userById,
    allUsers,

} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const { auth } = require('../middleware/auth');

const router = express.Router();


//router.get("/api/users", allUsers);






router.get('/users',(req,res)=>{
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("name email created");
//    res.clearCookie("w_auth");
    //return res.json({ message: "Signout success!" });
});


// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
