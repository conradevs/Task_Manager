import Project from "../models/Project.js";
import User from "../models/User.js";


const getProjects = async (req, res) => {
    const projects = await Project.find({
        '$or' : [
            {'collaborators' : {$in: req.user}},
            {'creator' : {$in: req.user}},
        ]
    }).select('-Tasks');

    res.json(projects)
};

const newProject = async (req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id

    try {
        const storedProject = await project.save()
        res.json(storedProject);
    } catch (error) {
        console.log(error)
    }
};

const getProject = async (req, res) => {
    const {id} = req.params;

    const project = await Project.findById(id)
        .populate({path: 'tasks', populate: {path: 'completedBy', select: 'name'}})
        .populate('collaborators','name email');

    if(!project) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(project.creator.toString() !== req.user._id.toString() && !project.collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString())){
        const error = new Error("Access denied")
        return res.status(401).json({msg: error.message});
    }
    res.json(project);
    //res.json(project)
};

const editProject = async (req, res) => {
    const {id} = req.params;

    const project = await Project.findById(id);

    if(!project) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error("Access denied")
        return res.status(401).json({msg: error.message});
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deadLine = req.body.deadLine || project.deadLine;
    project.client = req.body.client || project.client;
    project.tasks = req.body.tasks || project.tasks;
    project.collaborators = req.body.collaborators || project.collaborators;

    try {
        const storedProject = await project.save();
        res.json(storedProject);
    } catch (error) {
        console.log(error);
    }
};

const deleteProject = async (req, res) => {
    const {id} = req.params;

    const project = await Project.findById(id);

    if(!project) {
        const error = new Error("Not Found")
        return res.status(404).json({msg: error.message})
    }
    if(project.creator.toString() !== req.user._id.toString()){
        const error = new Error("Access denied")
        return res.status(401).json({msg: error.message});
    }
    try {
        await project.deleteOne();
        res.json({msg: "Project deleted"});
    } catch (error) {
        console.log(error);
    }
};

const findCollaborator  = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email}).select('-conf -createdAt -updatedAt -password -token -__v')
    if(!user) {
        const error = new Error('User not found')
        return res.status(404).json({msg: error.message});
    }
    res.json(user);
};

const addCollaborator  = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if(!project) {
        const error = new Error("Project not found");
        return res.status(404).json({msg: error.message});
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid Action...");
        return res.status(404).json({msg: error.message});
    }

    const {email} = req.body;
    const user = await User.findOne({email}).select('-conf -createdAt -updatedAt -password -token -__v')
    if(!user) {
        const error = new Error('User not found')
        return res.status(404).json({msg: error.message});
    }

    // Collaborator can't be project admin
    if(project.creator.toString() === user._id.toString()) {
        const error = new Error("Project admin already included in this project")
        return res.status(404).json({msg: error.message});
    }
    // check if collaborator is already included in project
    if(project.collaborators.includes(user._id)){
        const error = new Error("Collaborator already included in this project")
        return res.status(403).json({msg: error.message});
    }
    // Add collaborator to project
    project.collaborators.push(user._id);
    await project.save();
    res.json({msg: 'Collaborator included succesfully'})
    
};

const deleteCollaborator  = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if(!project) {
        const error = new Error("Project not found");
        return res.status(404).json({msg: error.message});
    }

    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error("Invalid Action...");
        return res.status(404).json({msg: error.message});
    }

    // Add collaborator to project
    project.collaborators.pull(req.body.id);
    await project.save();
    res.json({msg: 'Collaborator deleted succesfully'})
};


export {
    getProjects,
    newProject,
    getProject,
    editProject,
    deleteProject,
    findCollaborator,
    addCollaborator,
    deleteCollaborator  
}