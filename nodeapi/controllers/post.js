const Post = require("../models/post");
const User = require("../models/user");

const formidable = require("formidable");

const fs = require("fs");
const _ = require("lodash");

exports.findUsers = (req,res) => {
    User.find()
    .exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
//        next();
    })
}

exports.getPosts = (req, res) => {
	const posts = Post.find()
//   	.populate("participants.user", "_id name")
    //.populate("comments.postedBy", "_id name")
    //.populate("postedBy", "_id name")
	.select("_id title body created participants")
    .sort({ created: -1 })
	.then((posts) => {
		res.status(200).json(posts);
	})
	.catch(err => console.log(err));
};


exports.postsByUser = (req, res) => {
    Post.find({ "participants.user": req.profile._id })
        .populate("participants.user", "_id name")
        .select("_id title body created participants")
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
};

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        //.populate("postedBy", "_id name")
        //.populate("comments.postedBy", "_id name")
        //.populate("postedBy", "_id name role")
        //.select("_id title body created likes comments photo")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            req.post = post;
            next();
        });
};


exports.createPost = (req, res) => {
    const post = new Post(req.body);
    console.log("post", req.body)
     post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.status(200).json(result);
            //next();
        });
};

exports.createPostShort = (req, res, next) => {
	
        console.log("Creating post")
        const post = new Post(req.body);

//        req.profile.hashed_password = undefined;
//        req.profile.salt = undefined;
//        post.postedBy = req.profile;

//		post.participants.push({'user': req.profile});


        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
            next();
        });
  

};

