const {sendEmail}=require("./urtils/sendEmail.js");
require("dotenv").config;
async function testEmail()
{
    try{
         const response=await sendEmail(
            "mayurmali72150@gmail.com",
            "testing Email",
            "how are you"
         )
         console.log(response);
         
    }catch(error){ 
       console.log(error.message);
       
    }
}
testEmail();