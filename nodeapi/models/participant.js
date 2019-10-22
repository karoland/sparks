const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const participantSchema = new mongoose.Schema({
	    
	user: { 
		type: ObjectId, 
		ref: "User" 
	},
	named: {
		type: String
	},
	part: {
		type: String,
		enum: ['Author', 'Reciever'],
		default: 'Author'
	},
    destination: {
        type: String,
        enum: ['User', 'Email'],
        default: "User"
    },
	publicates: {
		type: Boolean,
		default:false
	},
    publication_date: { 
    	type: Date
    }

});

const Participant = mongoose.model('Participant',participantSchema);
module.exports = { Participant }