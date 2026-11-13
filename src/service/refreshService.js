const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const{REFRESH_TOKEN_EXPIRE,REFRESH_TOKEN_SECRET}=require("../config/serverConfig.js")
const{ACCESS_TOKEN_EXPIRE,ACCESS_TOKEN_SECRET}=require("../config/serverConfig.js")
const{findUser,updateUser}=require("../repository/usersRepository.js")

async function reGenratorTokens(oldRefreshToken) {
const token=jwt.verify(oldRefreshToken,REFRESH_TOKEN_SECRET)


const oldHashedRefreshToken=crypto.createHash("sha256")
                               .update(oldRefreshToken)
                               .digest("hex");

const user =await findUser({_id:token.id});


if(oldHashedRefreshToken!==user.refreshToken)
{
    throw{
        reason:"user is logged out re login first",
        statusCode:401
    }
}
const refreshToken=jwt.sign({email:user.email,id:user._id},REFRESH_TOKEN_SECRET,
    {expiresIn:REFRESH_TOKEN_EXPIRE}
);
const accessToken=jwt.sign({email:user.email,id:user._id},ACCESS_TOKEN_SECRET,
    {expiresIn:ACCESS_TOKEN_EXPIRE}
);
const hashedRefreshToken=crypto.createHash("sha256")
                               .update(refreshToken)
                               .digest("hex");
const userUpdate=await updateUser(user._id,{refreshToken:hashedRefreshToken})

return{refreshToken,accessToken}
}
module.exports=reGenratorTokens;