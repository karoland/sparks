const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema({
	title: {
        type: String,
        required: true,

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
    savedToProfile: {
        type: Boolean,
    },
    from: {
        user: {
            type: ObjectId, 
            ref: "User"
        },
        folder: {
            type: String,
            enum: ['Sent', 'Trash', 'Removed'],
            default: 'Sent'
        }
    },
    to: {
    	user: { 
    		type: ObjectId, 
    		ref: "User" 
    	},
        address: {
            type: String 
        },
        delivery: {
            type: String,
            enum: ['User', 'Email', 'FB'],
        },
    	isOpened: {
    		type: Boolean,
    		default:false
    	},
        openingDate: { 
        	type: Date
        },
        folder: {
            type: String,
            enum: ['Inbox', 'Trash', 'Removed'],
            default: 'Inbox'
        }
    },
    created: {
    	type: Date, 
    	default: Date.now 
    }

});

const Message = mongoose.model('Message', messageSchema);
module.exports = { Message }

