import User from "../models/User.js"

const registration = async (req, res) => {
    try{
        const user = new User(req.body);
        const userSaved = await user.save();
        res.json({msg: "Creando Usuario"});
    } catch (error) {
        console.log(error);
    }
    
}

export { registration };