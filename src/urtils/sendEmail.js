const nodemailer=require("nodemailer");
const {SMTP_HOST,SMTP_PORT,
    SMTP_USER,SMTP_PASSWORD
}=require("../config/serverConfig.js");
console.log(SMTP_HOST);                               

const transporter=nodemailer.createTransport({
    host:SMTP_HOST,
    port:SMTP_PORT,
    secure:true,
    auth:{
        user:SMTP_USER,
        pass:SMTP_PASSWORD
    }
});
async function sendEmail(to,subject,text){
    const info=await transporter.sendMail({
        from:SMTP_USER,
        to,
        subject,
         text
    });
    console.log(info);
    
    return info;

}
module.exports={sendEmail}
