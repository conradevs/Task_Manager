import Project from "../models/Project.js";
import Task from "../models/Task.js";
const addTask = async (req,res) => {
    const {project} = req.body;
    const isProject = await Project.findById(project);
    const {id} = req.params;
    console.log(id);
    if(!isProject) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(isProject.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(403).json({msg: error.message})
    }
    try {
        const taskStored = await Task.create(req.body);
        res.json(taskStored)
    } catch(error) {
        console.log(error)
    }
};

const getTask = async (req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(403).json({msg: error.message})
    }

    res.json(task);
};

const editTask = async (req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(task.project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Access denied")
        return res.status(403).json({msg: error.message})
    }

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.deadLine = req.body.deadLine || task.deadLine;

    try {
        const taskStored = await task.save();
        res.json(taskStored);
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id).populate("project");

    if(!task) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(task.project.creator.toString() !== req.user._id.toString()){
        const error = new Error("Access denied")
        return res.status(401).json({msg: error.message});
    }
    try {
        await task.deleteOne()
        res.json({msg: "Task Deleted"})
    } catch (error) {
        console.log(error);
    }
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