const {loginUser:loginUserService}=require("../service/authService.js");
async function loginUser(req,res)
{
  try{
    const response =await  loginUserService(req.body)
    res.cookie("authToken",response,{httpOnly:true,
      secure:false,
    maxAge:7*24*60*60*1000
     });
    return res.status(200).json({
        success:true,
        message:"user loged in successfully ",
        data:{},
        error:{}

    })
  }catch(error){
     console.log(error);
    return res.status(error.statusCode||500).json(
        {
            
            success:false,
            message:error.reason||"internal server error",
            data:{},
            error:error
        }
    )
  }   

}
module.exports={loginUser};