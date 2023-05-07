const { constants } = require("../constans");

const errorHandler=(error,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
    switch (statusCode) {
        case constants.Validation_error:
            res.json({
                title:"vaidation error",
                message:error.message,
                stackTrace:error.stack
            });
            break;
        case constants.forbidden:
            res.json({
                title:"forbiden",
                message:error.message,
                stackTrace:error.stack
            });
            break;
        case constants.unauthorized:
            res.json({
                title:"unauthorized",
                message:error.message,
                stackTrace:error.stack
            });
            break;
        case constants.not_found:
            res.json({
                title:"not found",
                message:error.message,
                stackTrace:error.stack
            });
            break;
        case constants.internal_error:
            res.json({
                title:"internal server error",
                message:error.message,
                stackTrace:error.stack
            });
            break;
    
        default:
            console.log("no error")
            break;
    }
   
};

module.exports=errorHandler;