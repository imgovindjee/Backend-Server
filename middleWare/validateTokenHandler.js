const asynchandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken = asynchandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
            if(error){
                res.status(401).json({message: "Invalid Token"});
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        })

        if(!token){
            res.status(401).json({message:"Something Went Wrong, Please Validate the Credientials"})
        }
    }
})

module.exports = validateToken;