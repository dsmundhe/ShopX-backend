//import ecpress from express
const express = require("express");

//create instance of express in app
const app = express();

//import port from .env file
const PORT = process.env.PORT || 5000;

//import dotenv file and config it
require("dotenv").config();

//import mongoose to create connection
const mongoose = require("mongoose");

//import routers from userRoute file
const router = require("./routes/userRouter");

 const cors =require('cors');
app.use(express.json());
app.use(cors());

//middleware for , access which is present in json body

app.get('/',(req,res)=>{
  res.send("<h1>Backend connected successful!</h1>")
})

//create post listen on perticular port
app.listen(PORT, () => {
  console.log("server started.......");
});

//import url from .env
const URI = process.env.MongoDB_URL;
mongoose
  .connect(URI)
  .then(() => {
    console.log("mongoDB connected.....");
  })
  .catch((error) => {
    console.log(error);
  });

//routers pass in milddle ware
app.use("/user", router);
