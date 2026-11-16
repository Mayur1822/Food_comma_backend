const multer=require("multer");
const path=require("path")
const storageConfiguration=multer.memoryStorage();
const uploads=multer({
    storage:storageConfiguration,
    limits:{
        fileSize:20*1024*1024
    }
})
module.exports=uploads;