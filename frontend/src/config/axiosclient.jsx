import axios from 'axios'
import dotenv from 'dotenv';

const axiosclient = axios.create({
    baseURL: `${process.env.VITE_BACKEND_URL}/api`
})

export default axiosclient;