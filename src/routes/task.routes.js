const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks); //arreglo data
    res.json(tasks);
});

//obtener un solo usuario

router.get('/:id', async (req, res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async(req, res)=>{
    const {nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario} =req.body;
    const task = new Task ({nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario});
    await task.save();
    console.log(req.body);
    res.json({status: 'saved'});
});

router.put('/:id', async (req, res)=>{
    const {nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario} =req.body;
    const newTask = {nombre_usuario,cedula_usuario,telefono_usuario,mail_usuario};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    res.json({status: 'Updated'});
});

router.delete('/:id', async (req, res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Deleted' });
});


module.exports = router;