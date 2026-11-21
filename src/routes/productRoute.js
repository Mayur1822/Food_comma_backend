const express=require("express");
const {createProduct,findProductById,updateProductById,deleteProductById}=require("../controller/productController.js")
const uploads=require("../config/multerConfig.js"); 
const router=express.Router();
router.post("/",uploads.single('productImage'),createProduct)
router.get("/:id",findProductById);
router.put("/:id",updateProductById);
router.delete("/:id",deleteProductById);

module.exports=router;