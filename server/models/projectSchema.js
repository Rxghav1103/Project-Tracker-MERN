const mongoose  = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    toDo: {
        type: Array,
        default: []
    },
    inProgress: {
        type: Array,
        default: []
    },
    completed: {
        type: Array,
        default: []
    },
    projectID: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project