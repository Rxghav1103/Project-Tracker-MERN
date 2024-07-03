const mongoose  = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }
    ,description: {
        type: String,
        required: true,
        trim: true
    },

    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task