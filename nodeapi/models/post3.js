const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
	title: {
        type: String,
        required: false,

    },
    body: {
        type: String,
        required: true,
    },
   /* postedBy: {
    	type: ObjectId, 
        ref: "User" 
    },*/
    photo: {
        data: Buffer,
        contenType: String
    },
    participants: [
        {
        	participant: { 
        		type: ObjectId, 
        		ref: "Participant" 
        	},

        }
    ],
    created: {
    	type: Date, 
    	default: Date.now 
    }

});



const Post = mongoose.model('Post',postSchema);
module.exports = { Post }