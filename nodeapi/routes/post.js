const express = require("express");
const { 
	getPosts, 
//	createPost, 
	createPostShort,
	createPost, 
	findUsers
//	postsByUser,
//	postById 
} = require("../controllers/post");

const  validator  = require("../validator");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const { auth } = require('../middleware/auth');


const router = express.Router();


router.post("/post", auth, createPost);

router.get("/posts", auth, getPosts);


router.get("/users", findUsers);

//router.get("/posts/:userId", getPosts);

router.post("/post/new/:userId", 
	//requireSignin, 
	createPostShort
	//validator.createPostValidator
	);




//router.get("/posts/by/:userId", requireSignin, postsByUser);


// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);
// any route containing :postId, our app will first execute postById()
//router.param("postId", postById);

module.exports = router;