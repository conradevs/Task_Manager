import { useState , useEffect, createContext} from 'react';
import axiosclient from '../config/axiosclient';
import  {useNavigate} from 'react-router-dom';
import NewProject from '../pages/NewProject';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false)
    
    const navigate = useNavigate();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await axiosclient('/projects', config)
                setProjects(data)
            } catch (error) {
                console.log(error);
            }
        }
        getProjects();
    },[])

    const showAlert = alert => {
        setAlert(alert)
        
        setTimeout(() => {
            setAlert({});
        },3000);
    }

    const submitProject = async project => {

        if (project.id) {
            await editProject(project);
        }
        else {
            await createProject(project);
        }
        return
        
    }

    const editProject = async project => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }    
            const {data} = await axiosclient.put(`/projects/${project.id}`,project,config)
            //Sincronize state
            const actualizedProjects = projects.map(projectState => projectState._id === data._id ? data : projectState)
            setProjects(actualizedProjects);
            // Show Alert
            setAlert({
                msg:'Project edited successfully',
                error: false
            })
            // Redirect
            setTimeout(() => {
                navigate('/projects')
            },1000);
        
        } catch (error) {
            console.log(error)
        }
    }

    const createProject = async project => {
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
            setProjects([...projects,data])
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

    const getProject = async id => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosclient(`/projects/${id}`,config)
            setProject(data)
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }
    
    const deleteProject = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }    
            const {data} = await axiosclient.delete(`/projects/${id}`,config)
            //Sincronize state
            const actualizedProjects = projects.filter(projectState => projectState._id !== id)
            setProjects(actualizedProjects);
            // Show Alert
            setAlert({
                msg: data.msg,
                error: false
            })
            // Redirect
            setTimeout(() => {
                navigate('/projects')
            },500);
        
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask)
    }

    const submitTask = async task => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axiosclient.post('/tasks',task,config)

            // Add task to state
            const updatedProject = {...project}
            updatedProject.tasks = [...project.tasks, data]
            setProject(updatedProject)
            setAlert({})
            setModalFormTask(false)            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ProjectsContext.Provider
            value={{
                projects,
                alert,
                project,
                loading,
                modalFormTask,
                showAlert,
                submitProject,
                getProject,
                deleteProject,
                handleModalTask,
                submitTask
            }}>{children}

        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext