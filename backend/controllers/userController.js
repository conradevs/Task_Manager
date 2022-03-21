import User from "../models/User.js"
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
const registration = async (req, res) => {
    //Prevent duplicate registers
    const {email, password} = req.body;
    const userExists = await User.findOne({email});
    
    if(userExists) {
        const error = new Error('User already exist')
        return res.status(400).json({msg: error.message});
    }
    try{
        const user = new User(req.body);
        user.token = generateId();
        const userSaved = await user.save();
        res.json({msg: "Creating User"});
    } catch (error) {
        console.log(error);
    }
    
}

const autenticate = async (req,res) => {
    const {email, password} = req.body;
    // Does User exist?
    const user = await User.findOne({email});
    if(!user) {
        const error = new Error("User doesn't exist");
        return res.status(404).json({msg: error.message});
    }
    // Is User confirmed?
    if(!user.conf) {
        const error = new Error("User account hasn't been confirmed");
        return res.status(403).json({msg: error.message});
    }
    // Valid Password?
    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(),
        });
    } else {
        const error = new Error("Wrong password");
        return res.status(403).json({msg: error.message});
    }
};

export { registration, autenticate };