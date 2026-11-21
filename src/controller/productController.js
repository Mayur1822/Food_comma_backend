const{createProduct:createProductService,
   findProductById:findProductByIdService,
   updateProductById:updateProductByIdService,
   deleteProductById:deleteProductByIdService
}=require("../service/productService.js");
const AppError=require("../utils/AppError.js");
async function createProduct(req,res){
    try{
      
       const response=await createProductService(req.body,req.file?.buffer);
        res.status(201).json({
        success:true,
        message:"Product created successfully",
        data:response,
        error:{}
       })
       
            
    }catch(error){
     console.log(error);
     if(error instanceof AppError) {
     return res.status(error.statusCode).json({
        success:false,
        message:error.message,
        data:{},
        error:error
     })
      
     }
     return res.status(500).json({
        success:false,
        message:"something went wrong try again later",
        data:{},
        error:error
     })
     
    }
}
async function findProductById(req,res){
   try{
      console.log(req.params.id);
      
      const response=await findProductByIdService(req.params.id);
      return res.status(200).json({
         success:true,
         message:"Product found successFully",
         data:response,
         error:{}
      })


   }catch(error){
     console.log(error);
     if(error instanceof AppError) {
     return res.status(error.statusCode).json({
        success:false,
        message:error.message,
        data:{},
        error:error
     })
      
     }
     return res.status(500).json({
        success:false,
        message:"something went wrong try again later",
        data:{},
        error:error
     })
     
    }
}
async function  updateProductById(req,res){
   try{
      const response=await updateProductByIdService(req.params.id,req.body)
      return res.status(200).json({
         success:true,
         message:"Product updated successfully",
         data:response,
        error:{}
      })
}catch(error){
     console.log(error);
     if(error instanceof AppError) {
     return res.status(error.statusCode).json({
        success:false,
        message:error.message,
        data:{},
        error:error
     })
      
     }
     return res.status(500).json({
        success:false,
        message:"something went wrong try again later",
        data:{},
        error:error
     })
     
    }
}
async function deleteProductById(req,res){
try{
     const response=await deleteProductByIdService(req.params.id);
     return res.status(200).json({
      success:true,
      message:"Product deleted successfully",
      data:response,
      error:{}
     }) 

}catch(error){
     console.log(error);
     if(error instanceof AppError) {
     return res.status(error.statusCode).json({
        success:false,
        message:error.message,
        data:{},
        error:error
     })
      
     }
     return res.status(500).json({
        success:false,
        message:"something went wrong try again later",
        data:{},
        error:error
     })
     
    }   
}


module.exports={
createProduct,
findProductById,
updateProductById,
deleteProductById
}