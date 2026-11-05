const jwt =require("jsonwebtoken");
const{JWT_SECRET}=require("../config/serverConfig.js");
async function isloggedin(req,res,next){
    const token =req.cookies.authToken;
    if(!token)
    {
        return res .status(401).json({
            success:false,
            message:"user not logged in ",
            data:{},
            error:"user not authenticated"

        })
    }
    const decoded=jwt.verify(token,JWT_SECRET);
    if(!decoded){
        return res.status(401).json({
            success:false,
            message:"wrtong token provided",
            data:{},
            error:"token is tampered"
        })
    }
req.user={email:decoded.email,
         id:decoded._id

}

next()
}
module.exports={isloggedin};