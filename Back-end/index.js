import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
// import { Task } from "./models/taskModel.js";
import mongoose from "mongoose";
import taskRoute from './routes/taskRoute';




const app =  express();
app.use(express.json());

app.get('/',(reqest, response) =>{
    console.log(request)
    return response.status(234).send('welcome to Task handling')
})

app.use('/tasks',taskRoute);

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


