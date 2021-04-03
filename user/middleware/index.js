
function createUserValidator(req, res, next){
    let errors = []
    if(req.body.username === ""){
        errors.push("username cant be empty")
    }
    if(req.body.password.length < 5){
        errors.push("password has to be more than 5 letters")
    }
    if(!req.body.email.includes("@")){
        errors.push("give a valid email")
    }
    if(errors.length !==0){
        return res.status(400).json({status: "failed", errors: errors})
    }
    next()
}


module.exports = {
    createUserMiddleware: createUserValidator
}