const jwt =require("jsonwebtoken");
const crypto=require("crypto");
const {ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_SECRET,REFRESH_TOKEN_EXPIRE}=require("../config/serverConfig.js")
const {findUser,createUser,updateUser}=require("../repository/usersRepository.js")
    async function registerUser(userDetails)
        {
            const user=await  findUser({
                email:userDetails.email,
                mobileNumber:userDetails.mobileNumber
            });
            if(user)
            {
                throw {reason :"user already registered try with different email and mobileNumber",
                    statusCode:400
                }
            }
            const response=await  createUser(userDetails);
            if(!response)
            {
                throw{
                    reason:"something went wrong please try again later",
                    statusCode:500
                }
            }
            const accessToken=jwt.sign({id:response._id,email:userDetails.email},
                ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_EXPIRE}
            )
            const refreshToken=jwt.sign({id:response._id,email:userDetails.email},
                REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_TOKEN_EXPIRE}
            )
            const hashedRefreshToken=crypto.createHash("sha256")
                                            .update(refreshToken)
                                            .digest("hex");
           const updatedUser= await updateUser(response._id,{refreshToken:hashedRefreshToken});




            
            return{response,accessToken,refreshToken};

         }    


module.exports=registerUser;