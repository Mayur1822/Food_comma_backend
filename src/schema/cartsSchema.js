const mongoose =require("mongoose");
const cartsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    items:[
        {
        product: {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Prduct"

            },
            quantity:{
                type:Number,
                required:true,
                default:1
            }
        }
    ]

},{timestamps:true})
const Cart=mongoose.model("Cart",cartsSchema);
module.exports=Cart;