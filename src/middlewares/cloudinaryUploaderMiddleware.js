const cloudinary=require("../config/cloudinaryConfig.js")
async function cloudinaryUploader(fileBuffer){
    return new Promise((res,rej)=>{
        const stream=cloudinary.uploader.upload_stream({
            folder:"pizz_app"
        },
    (error,result)=>{
        if(error)
        {
            return rej(error)
        }
        res(result);
    

    })
    stream.end(fileBuffer);
    })
    
}
module.exports={
    cloudinaryUploader
}