import axios from 'axios'

const axiosclient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default axiosclient;