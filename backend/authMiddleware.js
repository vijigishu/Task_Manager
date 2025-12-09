const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app=express();
app.use(express.json());
app.use(cookieParser());

function authMiddleware(req,res,next){

    const token=req.cookies.token;
    

    if(!token){
        return res.status(401).json({
          success:false,
          message:"Unauthorized"
        });
    }
    try{
        console.log("  ",token);
        require("dotenv").config();
        const JWT_SECRET=process.env.JWT_SECRET;
        const decoded = jwt.verify(token , JWT_SECRET );
        req.userId=decoded.userId;
        next();
    }
    catch(err){
        return res.status(401).json({success:false , message:"Invalid token"})
    }
}

module.exports = authMiddleware;