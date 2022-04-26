import {useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axiosclient from '../config/axiosclient';
const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth,setAuth] = useState({});
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate();
    useEffect(() => {
        const autenticateUser = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setLoading(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                const {data} = await axiosclient('/users/profile',config)
                setAuth(data) 
                navigate('/projects')
            } catch(error) {
                setAuth({})
            } finally {
                setLoading(false)
            }
        }
        autenticateUser()
    },[])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading
            }}
        >{children}</AuthContext.Provider>
    )
}

export {AuthProvider}
export default AuthContext;