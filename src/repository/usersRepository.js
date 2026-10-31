const User=require("../schema/usersSchema.js");
class UserRepository
{
    async  findUser(pararameter)
    {
        try{
        const response=await User.findOne({...pararameter});
       return response; 
    }catch(error){
       console.log(error);

       
    }

}
async createUser(userDetails)
{
try{
    const response =await User.create(userDetails);
    return response;                                                                                        
}catch(error){
console.log(error);

}
}
}
module.exports=UserRepository;