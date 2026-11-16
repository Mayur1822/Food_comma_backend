const Product=require("../schema/productSchema.js");
async function createProduct(productDetails)
{
    try{
        const response =await Product.create({...productDetails})
         return response;
    }catch(error){
        console.log(error);
        

    }
}
async function updateProduct(id,productDetails){
    try{
        const response=await Product.findByIdAndUpdate(id,{$set:productDetails},{new:true,runValidators:true})
    return response;
    }catch(error){
        console.log(error);
        
    }
}
async function findProduct(id){
try{
    const response=await Product.findById(id);
    return response;
}catch(error){
    console.log(error);
    
}
}
module.exports={
createProduct,
updateProduct,
findProduct
};