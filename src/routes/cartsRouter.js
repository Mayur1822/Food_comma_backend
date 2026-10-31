const express =require("express")
const router=express.Router();
router.get("/:id",(req,res)=>{
    console.log(req.body);
    return res.status(200).json({
        message:"welcome to cart id route"
    })
    
});
module.exports=router;