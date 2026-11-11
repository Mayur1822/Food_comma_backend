const reGenratorTokensService=require("../service/refreshService.js");
async function reGenratorTokens(req,res)
{
    try{
        const response=await reGenratorTokensService(req.cookies.refreshToken)
        res.cookie("refreshToken",response.refreshToken,
            {
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000

            }
        )
        res.cookie("accessToken",response.accessToken,
            {
                httpOnly:true,
                secure:false,
                maxAge:15*60*1000

            }

        )
        return res.status(201).json({
           success:true,
           message:"token regenorated successfully",
           data:{},
           error:{}
        })
    }catch(error){
        console.log(error);
        
        return res.status(error.statusCode||500).json({
            success:false,
            message:error.reason||"internal server error",
            data:{},
            error:error
        })
    }
}
module.exports=reGenratorTokens;