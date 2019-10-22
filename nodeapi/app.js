const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const moment = require("moment");
const _ = require("lodash");

const formidable = require("express-formidable");
const cloudinary = require('cloudinary').v2;

const fs = require("fs");

const cors = require("cors");
const btoa = require('btoa');
const sharp = require('sharp');


require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

//mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
.then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
mongoose.set('useFindAndModify', false);


// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());



// Models
const { User } = require('./models/user');
const { Post } = require('./models/post');
const { Participant } = require('./models/participant');
const { Message } = require('./models/message');

// Middlewares
const { auth } = require('./middleware/auth');
const { hasAuthorization } = require('./middleware/hasAuthorization');
const { joinMessages, joinPosts } = require('./middleware/findSavedMessages');

const { addFollowing, addFollower, 
    removeFollowing, removeFollower 
} = require('./controllers/user');

// UTILS
const { sendEmail } = require('./utils/mail/index');

//=================================
//              AUTH
//=================================

app.get('/api/users/auth',auth,(req,res)=>{
        res.status(200).json({
            isAuth: true,
            //email: req.user.email,
            //name: req.user.name,
            //_id: req.user._id
            auth: {"email": req.auth.email, "name": req.auth.name, "_id": req.auth._id}

        })
})

app.post('/api/users/signup', async (req,res)=>{
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            error: true,
            message: "Email is taken!",
        });
    }
    
    const user = await new User(req.body);
  
    await user.save((err,user)=>{
        if(err) return res.json({success:false,err});

        user.generateResetToken((err,user)=>{
            if(err) return res.json({success:false,err});
            sendEmail("", user.email, user.name, null,"activation_link", user)
            //Sprawdz, czy do maila są podpięte wiadomości i iskry. Jeśli tak, to je zamień
            
            res.status(200).json({
                success: true,
                message: "Signup success! Please click activation link.",
                user:user,
            })
            joinMessages(user.email, user._id);

        })
    })


});


app.post('/api/users/activate_user',(req,res)=>{

    var today = moment().startOf('day').valueOf();

    User.findOne({
        resetToken: req.body.resetToken,
        resetTokenExp:{
            $gte: today
        }
    },(err,user)=>{
        if(!user) return res.json({success:false,message:'Sorry, bad token'})
        if(user.emailConfirmed===true) return res.json({active:true, message:'Account activated before'})
    
//        user.resetToken = '';
//        user.resetTokenExp= '';
        user.emailConfirmed= true,

        user.generateToken((err,user)=>{
            if(err) return res.status(400).send(err);

            return res.status(200).json({
                success: true,
                userdata: {
                    _id : user._id,
                    name: user.name,
                    token: user.token,
                    email: user.email
                }
            })
        })

    })
})

app.post('/api/users/activation_link', async (req,res)=>{
    User.findOne({'email':req.body.email},
    (err,user)=>{
        if(!user) return res.json({success:false,error:'Email not found'});

        user.generateResetToken((err,user)=>{

            if(err) {return res.json({success:false,err});}

            sendEmail(null, user.email, user.name,null,"activation_link",user)
            
            res.status(200).json({
                success: true,
                message: "Activation link success. Please check your email",
                token: user.token,
                resetToken: user.resetToken,
                resetTokenExp: user.resetTokenExp
            })
        })
        
    })
});
app.post('/api/users/signin',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,error:'Email not found'});

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,error:'Email and password do not match'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);

                res.cookie('w_auth',user.token, { expire: new Date() + 9999 });
                return res.status(200).json({
                    loginSuccess: true,
                    userdata: {
                        _id : user._id,
                        name: user.name,
                        token: user.token,
                        avatar : (user.avatar!==undefined ?  user.avatar.url:undefined)
                        //avatar: user.avatar.url,
                    }
                })
            })
        })
    })
});

app.post('/api/users/auto_signin',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({loginSuccess:false,error:'Email not found'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);

               // res.cookie('w_auth',user.token, { expire: new Date() + 9999 });
                return res.status(200).json({
                    loginSuccess: true,
                    userdata: {
                        _id : user._id,
                        name: user.name,
                        token: user.token
                    }
                })
            })
        
    })
});

app.get('/api/users/signout',(req,res)=>{
    User.findOneAndUpdate(
        { token:req.body.token },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true,
                user: doc
            })
        }
    )
//    res.clearCookie("w_auth");
    //return res.json({ message: "Signout success!" });
});


//=================================
//              USERS
//=================================



//app.param("userId", userById);

app.param('userId', (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
    User.findById(id)
    .populate("following", "_id name avatar birthday places")
    .populate("followers", "_id name avatar birthday places")
    .exec((err, user) => {
                     //   console.log("In exec");
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }

           req.profile = user; // adds profile object in req with user info
            console.log("Found user");
            //return res.status(200).send(user)

            next();
        })
})

app.get('/api/users/:userId',(req,res)=>{
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

//all users
app.get('/api/users', auth, (req, res) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("name email created places birthday avatar");
})

app.get('/api/user/:userId', auth, (req, res) => {
    req.profile.__v = undefined;
    req.profile.password = undefined;
    req.profile.resetToken = undefined;
    req.profile.resetTokenExp = undefined;

    return res.json(req.profile);

})

//update user
app.put("/api/user/:userId", auth, hasAuthorization, (req, res, next) => {

    let user = req.profile;
    console.log("user in update: ", req.body);
    user = _.extend(user, req.body);
    user.updated = Date.now();

    user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.password = undefined;
            // console.log("user after update with formdata: ", user);
            res.json(user);
        });
});

app.put('/api/user/avatar/:userId', auth, formidable(),(req,res)=>{
    //console.log("REQ", req.files)
    cloudinary.uploader.upload(req.files.avatar.path, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    }, (err, result)=>{
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        //Dodaj
        console.log("Error", err)
        let image_id="";
        let user = req.profile;
        if(user.avatar) {image_id = user.avatar.public_id;}

        user.updated = Date.now();
        user = _.extend(user, {"avatar": {"public_id": result.public_id, "url": result.url}});

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            //res.json(user);
            

            //destroy old picture
            if(image_id) {
                cloudinary.uploader.destroy(image_id,(error,result)=>{
                })
            }

            res.json(result);

        })

       // res.status(200).send({
       //     public_id: result.public_id,
       //     url: result.url
       // })
    })
})


// app.post('api/user/follow',  (req,res) => {
//     console.log("Follow", req)
//     res.status(200).json({message: "OK"});
// });

//app.put("api/user/unfollow", auth, removeFollowing, removeFollower, (req,res) => {
//
//});

//delete user
app.delete("/api/user/:userId", auth, hasAuthorization, (req, res, next) => {
    let user = req.profile;
    user.remove((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }




        res.json({ message: "User deleted successfully" });

    });
});




app.post('/api/user/follow', auth, (req, res) => {

     User.findOneAndUpdate(
        {"_id": req.body.userId},
        { $push: { following: req.body.followId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

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
           // next();
        }
    )
   // res.json({ message: "User deleted successfully" });

});


app.post('/api/user/unfollow', auth, (req, res) => {

     User.findOneAndUpdate(
        {"_id": req.body.userId},
        { $pull: { following: req.body.followId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }

        User.findByIdAndUpdate(
            req.body.followId,
            { $pull: { followers: req.body.userId } },
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
           // next();
        }
    )
   // res.json({ message: "User deleted successfully" });

});

//=================================
//              POSTS
//=================================

app.post('/api/post', auth, async (req, res) => {

    let newPost = new Post(req.body);
    newPost.participants.push({'user': req.auth});


    if(newPost.participants) {
        let reciever = await newPost.participants.find(obj => obj.part === "Reciever")
        //console.log("Participant reciever", reciever)
        if(reciever) {
            let author = await newPost.participants.find(obj => obj.part === "Author")
            let from = await User.findOne({_id: author.user._id})
            
            if(reciever.delivery==="Email") {               
                // POWIADOMENIE
                sendEmail(from, reciever.address, null ,null,"new_post", newPost)

                let mailUser = await User.findOne({email: reciever.address})
                    if(mailUser) {
                        console.log("Mailowy")
                        // Zamiana maila na usera
                        reciever.delivery="User";
                        //mailParticipant.part="Reciever";
                        reciever.publicates="true";
                        reciever.user=mailUser._id;
                        reciever.address=undefined;
                    }
                }

            else if(reciever.delivery==="User"){
                console.log("User reciever")
                let existinglUser = await User.findOne({_id: reciever.user})
                if(existinglUser) {
                    console.log("User", existinglUser.email)
                    sendEmail(from, existinglUser.email, null ,null,"new_post", newPost)
                }
            } 
        }

    }

    newPost.save( (err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        post
        .populate("participants.user", "_id name avatar")
        .execPopulate()
        .then(function(result) {
            res.status(200).json(result);
        })
    });

});

app.get('/api/posts/:userId', auth, (req,res)=>{
//    console.log("POSTY id", req.profile)
   const posts = Post.find({"participants.user": req.profile._id})
   .populate("participants.user", "_id name avatar")
//    .populate("comments.postedBy", "_id name")
//    .populate("postedBy", "_id name")
   .select("_id title body created participants photo")
   .sort({ created: -1 })
   .exec((err,posts)=>{
       return res.status(200).send(posts);
   }  )

})

app.get('/api/friendsPosts/:userId', auth, async (req,res)=>{
//    console.log("POSTY id", req.profile)

    await User.findOne({_id: req.auth._id}, (err,user)=>{
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        let following=user.following;
        following.push(req.auth._id);

        Post.find({"participants.user": { $in: following}})
        .populate("participants.user", "_id name avatar")
//    .populate("comments.postedBy", "_id name")
        .select("_id title body created participants photo")
        .sort({ created: -1 })
        .exec((err,posts)=>{
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).send(posts);
            })
        })

})

app.post('/api/photo', formidable(), (req,res)=>{
//    console.log("REQ", req.files)
    cloudinary.uploader.upload(req.files.file.path, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    }, (err, result)=>{
        console.log("Error", err);
        if(err) return res.json({succes:false,err});
//        return res.json({error:true});
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    })
})

app.get('/api/removePhoto',(req,res)=>{
    let image_id = req.query.public_id;

    cloudinary.uploader.destroy(image_id,(error,result)=>{
        if(error) return res.json({succes:false,error});
        res.status(200).send('ok');
    })
})

//=================================
//              MESSAGES
//=================================

//write message
app.post('/api/newMessage', auth, async (req, res) => {

    let newMessage = new Message(req.body);
    newMessage.from.user = req.auth;

//    if(newMessage.to.delivery==="User")
    if(newMessage.to.delivery==="Email") {
            // POWIADOMENIE
            sendEmail(newMessage.from.user, newMessage.to.address, null ,null,"new_message", newMessage)

            //Sprawdzanie odbiorcy- jeśli jest w bazie, to dołączamy posta do usera
            //Szukam maila w bazie
            let mailUser = await User.findOne({email: newMessage.to.address})
            if(mailUser) {
                console.log("Mailowy")
                // Zamiana maila na usera
                newMessage.to.delivery="User";
                //mailParticipant.part="Reciever";
                newMessage.to.user=mailUser._id;
                newMessage.to.address=undefined;
                //console.log("Mailparticipant", newMessage.to)
            }
    }
    //User
    else if(newMessage.to.delivery==="User") {
        console.log("User")
        let existinglUser = await User.findOne({_id: newMessage.to.user})
        if(existinglUser) {
            console.log("User", existinglUser.email)
            sendEmail(newMessage.from.user, existinglUser.email, null ,null,"new_message", newMessage)
        }
    }


     newMessage.save( (err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        post
        .populate("from.user", "_id name avatar")
        .populate("to.user", "_id name")
        //.select("_id title body created from to")
        .execPopulate()
        .then(function(result) {
            return res.status(200).json({
                result
            })
        })
    })

});


app.post('/api/message/', (req,res)=>{
    console.log("Message id", req.body.messageid)
    Message.findOne({_id: req.body.messageid}, (err,message)=>{
            if(err) return res.json({success:false,error:'Sorry, no message found'})
            if(!message) return res.json({success:false,error:'Sorry, no message found'})

        message.to.isOpned="true";

        message.save( (err, post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            post
            .populate("from.user", "_id name avatar")
            .populate("to.user", "_id name email")    
            .execPopulate()
            .then(function(result) {
                return res.status(200).json({
                    message: result
                })
            })
        })

    })
})


app.post('/api/messageRead', auth, async (req,res)=>{
    console.log("Message id", req.auth)
//    console.log("Message id", req.profile)

    await Message.findOne({_id: req.body.messageid}, (err,message)=>{
            if(err) return res.json({success:false,error:'Sorry, no message found'})
            if(!message) return res.json({success:false,error:'Sorry, no message found'})

        message.to.isOpened="true";

        message.save( (err, post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
        })
    })

   Message.find({
    "$or": [{
        "to.user": req.auth._id
    }, {
        "from.user": req.auth._id
    }]
})
   .populate("to.user", "_id name avatar")
   .populate("from.user", "_id name avatar")
//    .populate("comments.postedBy", "_id name")
//    .populate("postedBy", "_id name")
   .select("_id title body created from to")
   .sort({ created: -1 })
   .exec((err,messages)=>{
       return res.status(200).send(messages);
   }  )


})
  

app.post('/api/getpost/', (req,res)=>{
    console.log("Post id", req.body.postid)
    Post.findOne({_id: req.body.postid}, (err,message)=>{
            if(err) return res.json({success:false,error:'Sorry, no post found'})
            if(!message) return res.json({success:false,error:'Sorry, no post found'})

        message.isOpened="true";

        message.save( (err, post) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            post
            .populate("participants", "part delivery")
            .populate("participants.user", "_id name email avatar")            
            .execPopulate()
            .then(function(result) {
                return res.status(200).json({
                    message: result
                })
            })
        })

    })
})

app.post('/api/savemessage/', (req,res)=>{
    console.log("Message id", req.body.messageid)

    Message.findOneAndUpdate({_id:req.body.messageid}, {savedToProfile: "true"}, (err,doc)=>{
            if(err) return res.json({success:false,err});
                console.log("Message", doc)

            return res.status(200).send({
                success: true,
                message: doc
            })
        });
})


app.get('/api/getAllMessages/:userId', auth, (req,res)=>{
    console.log("POSTY id", req.profile._id)
   const messages = Message.find({
    "$or": [{
        "to.user": req.profile._id
    }, {
        "from.user": req.profile._id
    }]
})
   .populate("to.user", "_id name avatar")
   .populate("from.user", "_id name avatar")
//    .populate("comments.postedBy", "_id name")
//    .populate("postedBy", "_id name")
   .select("_id title body created from to")
   .sort({ created: -1 })
   .exec((err,messages)=>{
       return res.status(200).send(messages);
   }  )

})

/*app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized" });
    }
});*/

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});

 