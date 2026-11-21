const {createProduct:createProductRepository,updateProductById:updateProductByIdRepository,
    findProductById:findProductByIdRepository,
deleteProductById:deleteProductByIdRepository}=require("../repository/productRepository.js");
const {cloudinaryUploader}=require("../middlewares/cloudinaryUploaderMiddleware.js")
const resourceNotFoundError =require("../utils/resourceNotFoundError");
async function createProduct(productDetails,imageFile){
    if(imageFile){
       var result=cloudinaryUploader(imageFile);
               const response= await createProductRepository({
        productName:productDetails.productName,
        description:productDetails.description,
        price:productDetails.price,
        productImage:"image is in the processing"
    
        })
    

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

async function deleteProductById(id)
{
    const response=await deleteProductByIdRepository(id);
        if(!response){
            throw new resourceNotFoundError('Product');           
            
        }
        return response;
    
}
async function updateProductById(id,productDetails){
    const response=await updateProductByIdRepository(id,productDetails);
    if(!response){
        throw new resourceNotFoundError('Product');
    }
    return response;
}

module.exports={
    createProduct,
    findProductById,
    deleteProductById,
    updateProductById    
}
