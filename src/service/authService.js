const {findUser,updateUser} =require("../repository/usersRepository.js");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const {ACCESS_TOKEN_EXPIRE,ACCESS_TOKEN_SECRET}=require("../config/serverConfig.js");
const {REFRESH_TOKEN_EXPIRE,REFRESH_TOKEN_SECRET}=require("../config/serverConfig.js");
const crypto =require("crypto")

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
    const updatedUser=await updateUser(user._id,hashedRefreshToken);

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
      const userUpdate=await updateUser(user._id,user.refreshToken=null)
}
module.exports={loginUser,logoutUser};
