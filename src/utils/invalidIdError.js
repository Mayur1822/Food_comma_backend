const AppError=require("./AppError.js");
class invalidIdError extends AppError{
    constructor(){
        super("id is invalid please give the right id",400);
    }
}
module.exports=invalidIdError;