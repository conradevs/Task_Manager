import mongoose from "mongoose";

const proySchema = mongoose.Schema({
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
        type: Date,
        trim: true,
        default: Date.now()
    },
    owner:{
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

const Proyect = mongoose.model('Proyect',proySchema);
export default Proyect;