const { Message } = require('./../models/message');


let joinMessages = (mail, userid) => {
	console.log("Mail i user", mail, userid)
	Message.find({"to.address": mail}, (err, messages) => {
		messages.map((message) => {
			message.to.delivery= "User";
			message.to.user=userid;
			message.to.address=undefined;

			message.save();

		})
		console.log("Messages", messages)

		return true
	})
	return false;

}

let joinPosts = (mail) => {

}

module.exports = { joinMessages }