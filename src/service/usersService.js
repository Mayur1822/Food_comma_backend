
const {findUser,createUser}=require("../repository/usersRepository.js")
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
            return response;
         }    


module.exports=registerUser;