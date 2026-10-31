class UserService{
    constructor(_userRepository)
    {
        this.userRepository=_userRepository;

    }
    async registerUser(userDetails)
        {
            const user=await this.userRepository.findUser({
                email:userDetails.email,
                mobileNumber:userDetails.mobileNumber
            });
            if(user)
            {
                throw {reason :"user already registered try with different email and mobileNumber",
                    statusCode:400
                }
            }
            const response=await this.userRepository.createUser(userDetails);
            if(!response)
            {
                throw{
                    reason:"something went wrong please try again later",
                    statusCode:500
                }
            }
            return response;
         }    
}

module.exports=UserService;