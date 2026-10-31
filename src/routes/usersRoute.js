const express=require("express");
const router=express.Router();
const createUser=require("../controller/usersController.js")
router.get("/:id",(req,res)=>{
    console.log(req.body);
    
    return res.status(200).json({
        message:"welcome to the user id route"
    })
});
router.get("/",(req,res)=>{
     console.log(req.body);
    return res.status(200).json(
        {
            message:"welcome to the user route"
        }
    )
});
router.post("/",createUser);

module.exports=router;
