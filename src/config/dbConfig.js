const mongoose=require("mongoose");
const dns=require("dns");
const MONGO_URI=require("./serverConfig").MONGO_URI;
dns.setServers(["8.8.8.8","1.1.1.1"]);
async function connectDb(){
try{
    await mongoose.connect(MONGO_URI,{
        dbName:"Pizza_app_backend"
    })
    console.log("db connection successfull");
    
}catch(error){
console.log("db connection failed",error);

}
}
module.exports=connectDb;