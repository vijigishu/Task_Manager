const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt"); // for hashing password


const uri = "mongodb+srv://vijigishup:Vijigishu04@cluster0.ygt9i.mongodb.net/";
const client = new MongoClient(uri);
let usersCollection;

async function connectDB() {
    await client.connect();
    const db = client.db("Task_Manager");
    usersCollection = db.collection("tasks");
    console.log("MongoDB connected!");

    
}

connectDB();
