import express from 'express';
import { Task } from "./models/taskModel.js";


const router = express.Router();
//route for adding new task
router.post('/', async(request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.description||
            !request.body.duedate
        ){
            return response.status(400).send({
                message:'All required fields: title, description, duedate',
            });
        }
        const newtask = {
            title: request.body.title,
            description: request.body.description,
            duedate: request.body.duedate,
        };
        const task = await Task.create(newtask);
        return response.status(200).send(task);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//view the tasks
router.get('/', async(request,response)=>{
    try{
        const tasks = await Task.find({});

        return response.status(201).send(tasks);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({mesage:error.message});
    }
})

//route for select one task
router.get('/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const task = await Task.findById(id);
        
        return response.status(201).send(task);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//route for update the task
router.put('/:id', async(request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.description||
            !request.body.duedate
        ){
            return response.status(400).send({
                message:'All required fields: title, description, duedate',
            });
        }
        const {id} = request.params;
        const result = await Task.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book Update Successfully'});
        
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({mesage:error.message});
    }
})

//route for delete a task
router.delete('/:id', async(request,response)=>{
    try{
        const {id} = request.params;
        const result = await Task.findByIdAndDelete(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(200).json({message: 'Book Deleted Successfully'});
        
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})


export default router;