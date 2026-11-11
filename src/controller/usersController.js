const registerUser=require("../service/usersService.js");
async function createUser (req,res){
    try{
        const responseObj=await registerUser(req.body);
        res.cookie("refreshToken",responseObj.refreshToken,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            secure:false,
            sameSite:'lax'
        
        })
        res.cookie("accessToken",responseObj.accessToken,
            {
            httpOnly:true,
            maxAge:15*60*1000 ,
            secure:false,
            sameSite:'lax'
             }
        )
        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            data:responseObj.response,
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