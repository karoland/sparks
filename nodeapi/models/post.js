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
    },
    participants: [
        {
        	user: { 
        		type: ObjectId, 
        		ref: "User" 
        	},
            address: {
                type: String 
            },
        	named: {
        		type: String
        	},
        	part: {
        		type: String,
        		enum: ['Author', 'Reciever'],
        		default: 'Author'
        	},
            delivery: {
                type: String,
                enum: ['User', 'Email', 'FB'],
                default: "User"
            },
        	publicates: {
        		type: Boolean,
        		default:true
        	},
            publication_date: { 
            	type: Date
            }
        }
    ],
    created: {
    	type: Date, 
    	default: Date.now 
    },
    isOpened: {
        type: Boolean,
        default:false
    },
    openingDate: { 
        type: Date
    }

});

const Post = mongoose.model('Post',postSchema);
module.exports = { Post }

