const dotenv =require("dotenv");
dotenv.config();
const PORT=process.env.PORT;
const MONGO_URI=process.env.MONGO_URI;
const JWT_SECRET=process.env.JWT_SECRET;
const JWT_EXPIRE=process.env.JWT_EXPIRE;

module.exports={PORT,MONGO_URI,JWT_EXPIRE,JWT_SECRET};