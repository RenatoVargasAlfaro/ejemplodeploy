const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
    //permite retornar los elementos de la coleccion(es un comando de mongo)
    const tasks = await Task.find(); 
    console.log(tasks);
    res.render('index', { //se le pasa el dato a la vista para mostrarlos
        tasks
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body); //creamos una nueva tarea
    //almacenamos en la bd y con await le decimos que los almacene
    await task.save();
    console.log(task);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    //obtiene el id de la tarea a borrar
    const id = req.params.id; 
    //va a eliminar la tarea de acuerdo al id
    await Task.remove({
        _id: id
    });
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    //obtiene el id de la tarea a cambiar el status
    const id = req.params.id; 
    //busca y almacena la tarea encontrada en base al id
    const task = await Task.findById(id);
    //cambia el status de la tarea
    task.status = !task.status;
    //se vuelve a almacenar en la bd
    await task.save();
    res.redirect('/');
});


//obtiene la info de la tarea a editar para mostrarlo en la vista editar
router.get('/edit/:id', async (req, res) => {
    //permite retornar los elementos de la coleccion de acuerdo al id(es un comando de mongo)
    const id = req.params.id; 
    const task = await Task.findById(id); 
    res.render('edit', { //se le pasa el dato a la vista para mostrarlos
        task
    });
});


//envia las nuevas modificaciones de esa tarea para poder guardarla en la bd
router.post('/edit/:id', async (req, res) => {
    //permite retornar los elementos de la coleccion de acuerdo al id(es un comando de mongo)
    const id = req.params.id; 
    //obtenemos los nuevos datos para actualizar
    const task = req.body;
    await Task.update({
        _id: id
    }, task); //buscamos la tarea por el id y luego le pasamos los datos a actualizar
    
    res.redirect('/');
});

module.exports = router;