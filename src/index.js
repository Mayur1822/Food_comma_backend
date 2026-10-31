const express=require("express");
const morgan =require("morgan");

const usersRouter=require("./routes/usersRoute.js");
const cartsRouter=require("./routes/cartsRouter.js");
const {PORT}=require("./config/serverConfig.js");
const connectDb=require("./config/dbConfig.js");

const app=express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use("/users",usersRouter);
app.use("/carts",cartsRouter)
app.get("/ping",(req,res)=>{
    return res.status(200).json({
        message:"welcome to ping route"
    });
});

app.all("/*splat",(req,res)=>{
    return res.status(404).json({
        message:"404 not found"
    })
});
app.listen(PORT,()=>{

    connectDb();
});
