const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require("moment");
const SALT_I = 10;
const { ObjectId } = mongoose.Schema;

require('dotenv').config();


const userSchema = new mongoose.Schema({
	name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    emailConfirmed: {
        type: Boolean,
        requierd: true,
        default: false,
    },
    token:{
        type:String
    },
    resetToken:{
        type:String
    },
    resetTokenExp:{
        type:Number
    },
    avatar: {
    },

    created: {
        type: Date,
        default: Date.now
    },
    following: [
        {
            type: ObjectId, 
            ref: "User" 
        }
    ],
    followers: [
        {
            type: ObjectId, 
            ref: "User" 
        }
    ],
    birthday: {
        type: Date
    },
    places: [ {
        type: String
    } ],
    works: [ {
        type: String
    } ],
    schools: [ {
        type: String
    } ],
    updated: Date
})


userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateResetToken = function(cb){
    var user = this;

    crypto.randomBytes(20,function(err,buffer){
        var token = buffer.toString('hex');
        var today = moment().startOf('day').valueOf();
        var tomorrow = moment(today).endOf('day').valueOf();

        user.resetToken = token;
        user.resetTokenExp = tomorrow;

        user.save(function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}


userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET)

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    jwt.verify(token,process.env.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}



const User = mongoose.model('User',userSchema);

module.exports = { User }