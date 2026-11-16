const express=require("express");
const {createProduct,findProduct}=require("../controller/productController.js")
const uploads=require("../config/multerConfig.js")
const router=express.Router();
router.post("/",uploads.single("productImage"),createProduct)
router.get("/:id",findProduct);
module.exports=router;