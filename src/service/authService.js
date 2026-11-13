const {findUser,updateUser} =require("../repository/usersRepository.js");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const {ACCESS_TOKEN_EXPIRE,ACCESS_TOKEN_SECRET}=require("../config/serverConfig.js");
const {REFRESH_TOKEN_EXPIRE,REFRESH_TOKEN_SECRET}=require("../config/serverConfig.js");
const crypto =require("crypto");
const {sendEmail}=require("../urtils/sendEmail.js");

async function loginUser(userDetails)
{
    const user =await findUser({email:userDetails.email})
    if(!user){
        throw{
            reason:"user not register with given email_id  please register first ",
            statusCode:404
        } 
    }
    const userIsValid= await bcrypt.compare(userDetails.password,user.password);
    if(!userIsValid){
        throw{
            reason:"wron password given please try again with right password",
            statusCode:401
        }

    }
    const accessToken= jwt.sign({email:user.email,id:user._id},ACCESS_TOKEN_SECRET,
        {expiresIn:ACCESS_TOKEN_EXPIRE});
    const refreshToken=jwt.sign({email:user.email,id:user._id},REFRESH_TOKEN_SECRET,
        {expiresIn:REFRESH_TOKEN_EXPIRE})
    const hashedRefreshToken=crypto.createHash("sha256")
                                   .update(refreshToken)
                                   .digest("hex");
    const updatedUser=await updateUser(user._id,{refreshToken:hashedRefreshToken});

return {accessToken,refreshToken};




}
async function logoutUser(id){
    const user =await findUser({_id:id});
    if(!user){
        throw{
            reason:"404 user not found",
            statusCode:404
        }
      
    } 
    
      const userUpdate=await updateUser(user._id,{refreshToken:null})
}
async function forgetPassword(userEmail){
if(!userEmail)
{
    throw{
        reason:"email must be provided",
        statusCode:400
    }
}
const user=await findUser({email:userEmail})
if(!user){
    throw{
        reasoon :"email not found register first",
        statusCode:404
    }
}
    const resetPasswordToken=crypto.randomBytes(32).toString("hex");
    const hashedResetPasswordToken=crypto.createHash("sha256")
                                    .update(resetPasswordToken)
                                    .digest("hex");

  const resetPasswordExpiry=Date.now()+10*60*1000;
  const userUpdate=await updateUser(user._id,{resetPasswordToken:hashedResetPasswordToken,
    resetPasswordTokenExpiry:resetPasswordExpiry
  });
  await sendEmail(user.email,
    "passwordToken",
    `your reset password token is ${resetPasswordToken}`
  )
  console.log(resetPasswordToken);
        
  
 
}
async function resetPassword(userDetails){
    const hashedResetPasswordToken= crypto.createHash("sha256")
                                          .update(userDetails.resetPasswordToken)
                                          .digest("hex");

    const user =await findUser({resetPasswordToken:hashedResetPasswordToken,
        resetPasswordTokenExpiry:{$gt:Date.now()}
    });
    if(!user){
        throw{
            reason:"reset password token expired or invalid",
            statusCode:401
        }
         
    } 
    const newPassword= await bcrypt.hash(userDetails.password,10)
        const updatedUser=await updateUser(user._id,{
            password:newPassword,
            resetPasswordToken:null,
            resetPasswordTokenExpiry:null,
            refreshToken:null

        }) 
        

}
module.exports={loginUser,logoutUser,forgetPassword,resetPassword};
