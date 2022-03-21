import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

const generateJWT = () => {
    return jwt.sign({name: 'Juan'},process.env.JWT_SECRET, {
        expiresIn: "30h",
    });
};
export default generateJWT;