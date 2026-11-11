const {loginUser:loginUserService,logoutUser:logoutUserService}=require("../service/authService.js");
async function loginUser(req,res)
{
  try{
    const response =await  loginUserService(req.body)
    res.cookie("refreshToken",response.refreshToken,{
      httpOnly:true,
      maxAge:7*24*60*60*1000,
      secure:false,
      sameSite:'lax'
     });
     res.cookie("accessToken",response.accessToken,
      {httpOnly:true,
        maxAge:15*60*1000,
        secure:false,
      sameSite:'lax'
      }
     )
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
async function logoutUser(req,res)
{
 try{
  await logoutUserService(req.user.id);
  res.clearCookie("accessToken",{
    httpOnly:true,
    maxAge:15*60*1000,
    secure:false,
      sameSite:'lax'
  });
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:false,
    maxAge:7*24*60*60*1000,
    sameSite:'lax'
  });
  return res.status(200).json({
    success:true,
    message:"user logged out successfully",
    data :{},
    error:{}
  })

 }catch(error){
 console.log(error);
return res.status(error.statusCode||500).json({
  success:false,
  message:error.reason||"something went wrong try again later",
  data:{},
  error:error
}) 
 }
}
module.exports={loginUser,logoutUser};
