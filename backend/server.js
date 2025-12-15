const express = require("express");
 require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcrypt"); // for hashing password
const app=express();
const authMiddleware = require("./authMiddleware");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const client = new MongoClient(process.env.MONGO_URI);
let usersCollection;
let tasksCollection;
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));


async function connectDB() {
    await client.connect();
    const db = client.db("Task_Manager");
    usersCollection = db.collection("users");
    tasksCollection = db.collection("tasks");
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
       
        
        const JWT_SECRET = process.env.JWT_SECRET;
       
        const token = jwt.sign(
  { username: user.username, userId: user._id },
  JWT_SECRET,
  { expiresIn: "5d" }
);
          console.log("its okaay tilll here");
        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        });
       
       
       
        return res.status(201).json({
         success:"true",
         message:"user authenticated succesfully",
         token:token
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

app.get("/api/tasks",authMiddleware,async function(req,res){
    try {
        console.log(req.userId);
        const userObjectId = ObjectId.createFromHexString(req.userId);
        const tasks = await tasksCollection.find({ userid: userObjectId }).toArray();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
})

app.post("/api/add_tasks",authMiddleware,async function(req,res){
    console.log("Working till authmiddleware")
    try{
    const title=req.body.title;
    const description=req.body.description;
    const userObjectId1 = ObjectId.createFromHexString(req.userId);
    const task={
        title:title,
        description:description,
        userid:userObjectId1
    };
    await tasksCollection.insertOne(task);
    res.status(201).json({
        success:true,
        message:"Task inserted successfully"
    })
}
catch(error){
    console.log("server error 500");
    res.status(500).json({
        success:false,
        message:"Server Error"
    })
}

})


app.listen(5000, () => console.log("Server running on port 5000"));
