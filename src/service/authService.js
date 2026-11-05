const {findUser} =require("../repository/usersRepository.js");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const {JWT_SECRET}=require("../config/serverConfig.js");
const {JWT_EXPIRE}=require("../config/serverConfig.js");
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
    const response= jwt.sign({email:user.email,id:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRE});
    
return response;




}
module.exports={loginUser};