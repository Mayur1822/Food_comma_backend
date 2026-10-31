const UserService=require("../service/usersService.js");
const UserRepository=require("../repository/usersRepository.js");
const userService=new UserService(new UserRepository())
async function createUser (req,res){
    try{
        const response=await userService.registerUser(req.body);
        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            data:response,
            error:{}
            
        })


    }catch(error){
        return res.status(error.statusCode).json({
        success:false,
        message : error.reason,
        data:{},
        error:error

        })
    }
}
module.exports=createUser;