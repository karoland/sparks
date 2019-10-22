require('dotenv').config();

const newPost = (from, data) => {
//    console.log("action data", from)


    const URL = process.env.NODE_ENV === 'production' ? process.env.ROOT_URL: 'http://localhost:3000';
    let imgurl= from.avatar ? from.avatar.url : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"

  return `
    <!DOCTYPE html>
   <html style="margin: 0; padding: 0px 30px 0px 30px;">
   
       <head>
       <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    a:link { color:#fff; text-decoration: none; }
    a:visited { color:#fff; text-decoration: none; }
    a:hover { color:#fff; text-decoration: none; }
    a:active { color:#fff; text-decoration: none; }
    </style>
           <title> Nowa Waidomość</title>
       </head>
   
          <body style="  margin: 10; 
                          padding: 10; 
                          text-align: center; 
                          color: #6E6E6E; 
                          font-family: 'Roboto', sans-serif;
                          text-decoration: none;
          " >
        
               <div >
               <img src="https://ecsmedia.pl/c/flaming-ogrodowy-qubuss-rozowo-zolty-85x30x9-cm-p-iext53058254.jpg" alt="wieldy" title="wieldy" width="92" height="92" />
               </div>
                    
               <h2>Masz nową iskierkę sympatii od <strong>  ${from.name} </strong></h2>
               <img src="${imgurl}" style="border-radius: 20%;" width="92" height="92" />

              <h2> "${data.body}" </h2>

              <button type="button" style="background-color: #2AD1DD; border: none;
  color: white; text-decoration: none; font-size: 16px; padding: 12px 24px;"> 
                <a href="${URL}/newPost/${data._id}">
                Przeczytaj całą wiadomość
              </button>
              
           </body>
   
     </html>
    `;
};

module.exports = { newPost };
