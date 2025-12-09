const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt"); // for hashing password
const app=express();
const jwt = require("jsonwebtoken");

app.use(cors());
const uri = "mongodb+srv://vijigishup:Vijigishu04@cluster0.ygt9i.mongodb.net/";
const client = new MongoClient(uri);
let usersCollection;
app.use(express.json());


async function connectDB() {
    await client.connect();
    const db = client.db("Task_Manager");
    usersCollection = db.collection("users");
    console.log("MongoDB connected!");
    
}
connectDB();

app.post("/api/signup", async function(req,res){
    console.log("Received body:", req.body);
    const username=req.body.username;
    const password=req.body.password;
    const saltRounds = 10;

    
    
    try{
        const existinguser=await usersCollection.findOne({username:username})
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"Username already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await usersCollection.insertOne({username:username,password:hashedPassword});
        return res.status(201).json
      ({
    success:true,
    message:"user registered successfully"
       })  
       
       
    }
    catch(error){
        console.error("Error",error);
        return res.status(500).json({success:false , message:"server error"});
    }
    
});
app.post("/api/signin",async function(req,res){
     const username=req.body.username;
     const password=req.body.password;

    try{
    const user=await usersCollection.findOne({username:username});
    if(!user){
        return res.status(400).json({
        success:"false",
        message:"User not registered"
    })
    }
    const storedhash=user.password;
    const isValid = await bcrypt.compare(password, storedhash);
    if(isValid){
        const token=jwt.sign({username:user.username})
       return res.status(201).json({
         success:"true",
         message:"user authenticated succesfully"
       })
    }
    return res.status(401).json({
         success:"false",
         message:"Please ensure that the password is correct"
       })
    
    }
    catch(error){
        res.status(500).json({
            success:"false",
            message:"server error"
        });
    }

});
app.listen(5000, () => console.log("Server running on port 5000"));
