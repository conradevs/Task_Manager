import { useState , useEffect, createContext} from 'react';
import axiosclient from '../config/axiosclient';
import  {useNavigate} from 'react-router-dom';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState([]);
    
    const navigate = useNavigate();

    const showAlert = alert => {
        setAlert(alert)
        
        setTimeout(() => {
            setAlert({});
        },3000);
    }

    const submitProject = async project => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosclient.post('/projects',project,config)
            setAlert({
                msg:'Project created successfully',
                error: false
            })
            setTimeout(() => {
                navigate('/projects')
            },3000);
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <ProjectsContext.Provider
            value={{
                projects,
                alert,
                showAlert,
                submitProject
            }}>{children}

        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext