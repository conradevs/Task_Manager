import mongoose from "mongoose";

const projSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    deadLine: {
        type: Date,
        trim: true,
        default: Date.now()
    },
    client:{
        type: String,
        trim: true,
        default: Date.now()
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    collaborators:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
}, {
    timestamps: true
});

const Project = mongoose.model('Project',projSchema);
export default Project;