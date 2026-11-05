const User=require("../schema/usersSchema.js");


    async function  findUser(pararameter)
    {
        try{
        const response=await User.findOne({...pararameter});
       return response; 
    }catch(error){
       console.log(error);

       
    }

}
async  function createUser(userDetails)
{
try{
    const response =await User.create(userDetails);
    return response;                                                                                        
}catch(error){
console.log(error);

}
}

module.exports={
    findUser,createUser
};