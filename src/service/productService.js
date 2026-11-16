const {createProduct:createProductRepository,updateProduct:updateProductRepository,
    findProduct:findProductRepository
}=require("../repository/productRepository.js");
const {cloudinaryUploader}=require("../middlewares/cloudinaryUploaderMiddleware.js")
async function createProduct(productDetails,imageFile){
    if(imageFile){ 
        var result=cloudinaryUploader(imageFile);
        

    }
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
            const productUpdate=await updateProductRepository(response._id,{productImage:result.secure_url})
           return productUpdate;
        })


            return response;

}
async function findProduct(id){
const response=await findProductRepository(id)
if(!response){
    throw{
           reason :"Product not found",
           statusCode:404
    }
}
return response;
}
module.exports={
    createProduct,
    findProduct
}
