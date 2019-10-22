require('dotenv').config();

const activationLink = data => {

    const URL = process.env.NODE_ENV === 'production' ? process.env.ROOT_URL: 'http://localhost:3000';


  return `
    <!DOCTYPE html>
   <html style="margin: 0; padding: 0px 30px 0px 30px;">
   
       <head>
       <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    </style>
           <title> Email | Activation link</title>
       </head>
   
           <body style="margin: 0; padding: 0; font-family: 'Roboto', sans-serif; " >
        
               <div >
               <img src="https://ecsmedia.pl/c/flaming-ogrodowy-qubuss-rozowo-zolty-85x30x9-cm-p-iext53058254.jpg" alt="wieldy" title="wieldy" width="92" height="92" />
               </div>
               
     
               <h3>Acticave your account</h3>
               <p><span>Click on this link to activate your account:</span></p>
               <a href="${URL}/activate/${data.resetToken}">
                <font style= "color: #A172E7">Activate account</font></a>
          
              
           </body>
   
     </html>
    `;
};

module.exports = { activationLink };
