const AppError=require("./AppError.js");
class resourceNotFoundError extends AppError{
    constructor(resource){
        super(`The ${resource} Not Found `,404);
    }

}
module.exports=resourceNotFoundError;