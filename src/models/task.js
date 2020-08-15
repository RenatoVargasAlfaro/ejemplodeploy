const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema ({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

//exportamos el modelo
module.exports = mongoose.model('tasks' ,Task);