import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app =  express();

app.get('/',(req, res) =>{
    console.log(req)
    return res.status(234).send('welcome to Task handling')
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('Database Connected');
        app.listen(PORT,()=> {
            console.log(`listening: ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error);
    });


