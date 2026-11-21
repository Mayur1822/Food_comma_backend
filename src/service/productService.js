const {createProduct:createProductRepository,updateProductById:updateProductByIdRepository,
    findProductById:findProductByIdRepository}=require("../repository/productRepository.js");
const {cloudinaryUploader}=require("../middlewares/cloudinaryUploaderMiddleware.js")
async function createProduct(productDetails,imageFile){
    if(imageFile){
       var result=cloudinaryUploader(imageFile);
               const response= await createProductRepository({
        productName:productDetails.productName,
        description:productDetails.description,
        price:productDetails.price,
        productImage:"image is in the processing"
    
        })
             if(!response){
        throw{
            reason:"somethimg went wrong try again later",
            statusCode:500
        }  
    }      
    
 
                result.then(async(result)=>{
            const productUpdate=await updateProductByIdRepository(response._id,{productImage:result.secure_url})
           return productUpdate;
        })
        return response;
       
        

    }
        else
        {

            const response= await createProductRepository({
        productName:productDetails.productName,
        description:productDetails.description,
        price:productDetails.price,
        productImage:"image is not given"
    
        })
          if(!response){
        throw{
            reason:"somethimg went wrong try again later",
            statusCode:500
        }
    }
            return response;
        }

        

}
async function findProductById(id){
const response=await findProductByIdRepository(id)
if(!response){
    throw new resourceNotFoundError('Product');
}
return response;
}


module.exports={
    createProduct,
    findProductById,
    }
