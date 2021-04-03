const jwt = require("jsonwebtoken")

function tokenGenerator(data){
    const accessToken = jwt.sign(
        { 
            id: data.id,
            username: data.username,
            email: data.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: 60 * 60 
        }
    )
    const refreshToken = jwt.sign(
        { 
            id: data.id,
            username: data.username,
            email: data.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: 60*60 
        }
    )
    return({accessToken, refreshToken})
}

const verifyRefreshToken = (token, callback)=>{

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return null;
        let extractedUserData = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        return callback(200, "success", tokenGenerator(extractedUserData))
    });

}

module.exports = {
    token: tokenGenerator,
    verifyToken: verifyRefreshToken
}