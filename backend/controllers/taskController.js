import Project from "../models/Project.js";
import Task from "../models/Task.js";
const addTask = async (req,res) => {
    const {project} = req.body;
    const isProject = await Project.findById(project);

    if(!isProject) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(isProject.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(404).json({msg: error.message})
    }
    try {
        const taskStored = await Task.create(req.body);
        res.json(taskStored)
    } catch(error) {
        console.log(error)
    }
};

const getTask = async (req,res) => {
    
};

const editTask = async (req,res) => {
    
};

const deleteTask = async (req,res) => {
    
};

const  changeState = async (req,res) => {
    
};

export {
    addTask,
    getTask,
    editTask,
    deleteTask,
    changeState
};