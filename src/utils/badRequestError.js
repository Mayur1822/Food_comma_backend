const AppError=require("./AppError");
class BadRequestError extends AppError{
    constructor(invalidParams){
       if(invalidParams===undefined){
         super("please send parameters and theire value to update or create product",400)
       }
       else{
       let invalidParamsStr="";
       invalidParams.forEach(params=>invalidParamsStr+=`${params}, 
        `);

       super(`user  sent the invalid Params and invalid Params are ${invalidParamsStr}`,400);
       }
    }
    

}
module.exports=BadRequestError;
