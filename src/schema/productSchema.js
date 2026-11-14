const mongoose =require("mongoose");
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"ProductName is required"],
        minLength:[5,"ProductName atleast have 5 character"],
        trim:true,
        
    },
    description:{
        type:String,
        minLength:[5,"description atleast have 5 character"]
    },
    productImage:{
        type:String
    },
    price:{
        type:Number,
        required:[true,"Price must be provided"]
    },
    category:{
        type:String,
        enum:["veg","non veg","drinks","sides"],
        default:"veg"
    },
    inStock:{
        type:Boolean,
        required:[true,"InStock must be provided"],
        default:true
    }


},{timeStamps:true});
const Product=mongoose.model("Product",productSchema);
module.exports=Product;