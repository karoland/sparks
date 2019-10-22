require("dotenv").config();

const User = require("../models/user");
const jwt    = require('jsonwebtoken')
const formidable = require("formidable");
const fs = require("fs");
const mongoose = require("mongoose");
const _ = require("lodash");


let addFollowing = (req, res, next) => {
	    console.log("Follow", req.body)

    User.findOneAndUpdate(
        {"_id": req.body.userId},
        { $push: { following: req.body.followId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        }
    );
};

let addFollower = (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.body.userId } },
        { new: true }
    )
        .populate("following", "_id name avatar birthday places")
        .populate("followers", "_id name avatar birthday places")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.password = undefined;
            res.json(result);
        });
};

let removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { following: req.body.unfollowId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        }
    );
};

let removeFollower = (req, res) => {
    User.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.body.userId } },
        { new: true }
    )
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.password = undefined;
            res.json(result);
        });
};


module.exports = { addFollowing, addFollower }
