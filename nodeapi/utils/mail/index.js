const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { resetPass } = require("./resetpass_template");
const { activationLink } = require("./activation_template");
const { newMessage } = require("./message_template");
const { newPost } = require("./post_template");


require('dotenv').config();

const getEmailData = (from, to,name,token,template,actionData) =>{
    console.log("action data", from)
    let data = null;

    switch(template){
        case "welcome":
            data = {
                from: "Waves <waves.guitars.rev@gmail.com>",
                to,
                subject: `Welcome to waves ${name}`,
                html: welcome()
            }
        break;
        case "reset_password":
            data = {
                from: "Waves <waves.guitars.rev@gmail.com>",
                to,
                subject: `Hey ${name}, reset your pass`,
                html: resetPass(actionData)
            }
        break;
        case "activation_link":
            data = {
                from: "Waves <waves.guitars.rev@gmail.com>",
                to,
                subject: `Activation link`,
                html: activationLink(actionData)
            }
        break;
        case "new_message":
            data = {
                from: `${from.name} <heartyspark@gmail.com>`,
                to,
                subject: `Nowa sekretna wiadomość`,
                html: newMessage(actionData)
            }
        break;
        case "new_post":
            data = {
                from: `${from.name} <heartyspark@gmail.com>`,
                to,
                subject: `Nowa iskierka sympatii`,
                html: newPost(from,actionData)
            }
        break;
        default:
            data;
    }
    return data;
}


const sendEmail = (from, to,name,token,type,actionData = null) => {

    const smtpTransport = mailer.createTransport({
        service:"Gmail",
        auth:{
            user: "a.ja.chodze.w.strugach.wody@gmail.com",
            pass: process.env.EMAIL_PASS
            //pass: "klickliccc4"

        }
    });

    const mail = getEmailData(from, to,name,token,type,actionData)

    smtpTransport.sendMail(mail,function(error,response){
        if(error){
            console.log(error);
        } else {
            cb()
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }