const AppError=require("./AppError.js");
class internalServerError extends AppError{
    constructor(){
      super("it is not you it is server error try again after some time",500);
    }
}
module.exports=internalServerError;