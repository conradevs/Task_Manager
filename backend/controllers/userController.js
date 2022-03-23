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
            token: generateJWT(user._id),
        });
    } else {
        const error = new Error("Wrong password");
        return res.status(403).json({msg: error.message});
    }
};

const confirmation = async (req, res) => {
    const {token} = req.params;
    const userConfirmation = await User.findOne({token});
    if(!userConfirmation) {
        const error = new Error("Invalid Token");
        return res.status(403).json({msg: error.message});
    }
    try{
        userConfirmation.conf = true;
        userConfirmation.token = "";
        await userConfirmation.save();
        res.json({msg: "User Account confirmated successfully"});
        console.log(userConfirmation);
    } catch (error) {
        console.log(error);
    }
}

const forgotPassword = async (req, res) => {  
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        const error = new Error("User doesn't exist");
        return res.status(404).json({msg: error.message});
    }
    try {
        user.token = generateId();
        await user.save();
        res.json({msg: "You will recieve an email with instructions"});
    } catch(error){
        console.log(error);
    }

}


const confirmToken = async (req, res) => { 
    const {token} = req.params;
    const validToken = await User.findOne({token});
    if (validToken) {
        res.json({msg: "Valid token, User exist"});
    } else {
        const error = new Error("Invalid Token");
        return res.status(404).json({msg: error.message});
    }
};

const newPassword = async (req, res) => { 
    const {token} = req.params;
    const {password} = req.body;
    const user = await User.findOne({token});
    if (user) {
        user.password = password;
        user.token = ''
        try{
            await user.save()
            res.json({msg: "New password was saved successfully"});
        } catch(error) {
            console.log(error);
        }
    } else {
        const error = new Error("Invalid Token");
        return res.status(404).json({msg: error.message});
    } 
};

const profile = async (req,res) => {
    const {user} = req
    res.json(user)
}

export { registration,
    autenticate,
    confirmation,
    forgotPassword,
    confirmToken,
    newPassword,
    profile
};