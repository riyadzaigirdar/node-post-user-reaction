const sql = require("../db.js")
const bcrypt = require("bcrypt");
const {token, verifyToken} = require("../utils")

const createUser = (callback, data) => {
    bcrypt.hash(data.password, 10, function(err, hash) {
        if(err) return callback(500, "failed", "something went wrong, try again later")
        data.password = hash
        sql.query("insert into user set ?", data,(err)=>{
            if(err?.errno === 1062) return callback(403, "failed" , "Email already taken")
            return callback(201, "success", "user created")
        })
    }); 
}

const loginUser = (callback, data) => {
    sql.query("select * from user where email = ?", data.email, (err, query)=>{
        if (err) return callback(500, "failed", null);
        if (query.length === 0) return callback(404, "user with that email not found", null)
        bcrypt.compare(data.password, query[0].password, function(err, result) {
            if(!result) return callback(400, "password didn't match", null)
            return callback(200, "successfully generated token", token(query[0]))
        });
        
    })

}

const refreshToken = (callback, data)=>{

    // must check the refresh token in redis
    // if (refreshTokens.includes(refreshToken)) {
    // } else {
    //     res.status(403).send();
    // }
    verifyToken(data.refreshToken, (code, message, data)=>{
        return callback(code, message, data)
    })
 
    


    
}

module.exports = {
    create: createUser,
    login: loginUser,
    refresh: refreshToken
}