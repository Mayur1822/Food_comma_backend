const Product=require("../schema/productSchema.js");
const internalServerError=require("../utils/internalServerError.js");
const badRequestError=require("../utils/badRequestError.js")
const invalidIdError=require("../utils/invalidIdError.js")
const mongoose =require("mongoose");

async function createProduct(productDetails)
{
    try{
        const response =await Product.create({...productDetails})
         
        return response;
    }catch(error){
       console.log(error);


       if(error.name==='ValidationError'){
            const invalidParamsMessage=Object.keys(error.errors).map(property=>{
             return error.errors[property].message
            })
            throw new badRequestError(invalidParamsMessage);
        }
                throw new internalServerError();
                      
    }
}
async function updateProductById(id,productDetails){
    try{
        const response=await Product.findByIdAndUpdate(id,{$set:productDetails},{new:true,runValidators:true})
    return response;
    }catch(error){
        console.log( "Error Name :",error.name,"\nError Message",error.message,"\n Error Stack",error.stack);
        console.log(Object.entries(error))
        if(!mongoose.isValidObjectId(id))
        {
          throw new invalidIdError();
        }

        else if(!productDetails)
        { 
            throw new badRequestError();
        }
        else if(error.name==="ValidationError")
        {
        const invalidParams =Object.keys(error.errors).map(property=>{
              return error.errors[property].message 
            })
            throw new badRequestError(invalidParams);
        }
        throw new internalServerError();
    }
}
async function findProductById(id){
try{
    
    const response=await Product.findById(id);
    
    return response;
}catch(error){
    console.log(error)
    if(!mongoose.isValidObjectId(id))
       {
        throw new invalidIdError();
       }    
     throw new internalServerError();

    
}0
}
async function deleteProductById(id){
    try{
         
        const response=await Product.findByIdAndDelete(id);
        console.log(response);
        return response;
            
    }catch(error){
        console.log(error);
        if(!mongoose.isValidObjectId(id)){
            throw new invalidIdError();
        }
        throw new internalServerError();
    }
}

module.exports={
createProduct,
updateProductById,
findProductById,
deleteProductById
};