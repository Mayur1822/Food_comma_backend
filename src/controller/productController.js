const { result } = require("lodash");
const{createProduct:createProductService,
   findProduct:findProductService
}=require("../service/productService.js");
async function createProduct(req,res){
    try{
      
       const response=await createProductService(req.body,req.file.buffer)
        res.status(201).json({
        success:true,
        message:"Product created successfully",
        data:response,
        error:{}
       })
       
             
    }catch(error){
     console.log(error);
     return res.status(error.statusCode||500).json({
        success:false,
        message:error.statusCode||"something went wrong try again later",
        data:{},
        error:error
     })
     
    }
}
async function findProduct(req,res){
   try{
      console.log(req.params.id);
      
      const response=await findProductService(req.params.id);
      return res.status(200).json({
         success:true,
         message:"Product found successFully",
         data:response,
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
module.exports={
createProduct,
findProduct
}