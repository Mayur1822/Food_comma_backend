const multer=require("multer");
const{CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary=require("./cloudinaryConfig.js");
const path=require("path")
const storageConfiguration=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"pizza_app",
        formate:["jpeg","jpg","png"],
        public_id:(req,file)=>{
        return `${Date.now()}--${path.extname(file.originalname)}`      
        }
    }
});
const uploads=multer({storage:storageConfiguration});
module.exports=uploads;