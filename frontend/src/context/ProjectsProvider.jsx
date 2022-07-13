import { useState , useEffect, createContext} from 'react';
import axiosclient from '../config/axiosclient';
import  {useNavigate} from 'react-router-dom';
import NewProject from '../pages/NewProject';
import Alert from '../components/Alert';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [task, setTask] = useState({});
    const [modalDeleteTask,setModalDeleteTask] = useState(false)
    const [collaborator, setCollaborator] = useState({})
    const [modalDeleteCollaborator,setModalDeleteCollaborator] = useState(false)
    const [ finder, setFinder] = useState(false);

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
                const {data} = await axiosclient.get('/projects', config)
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
            navigate('/projects')
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {setAlert({})},2000)

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
        setModalFormTask(!modalFormTask);
        setTask('');
    }

    const submitTask = async task => {

        if(task?.id) {
            await editTask(task)
        }
        else{
            await createTask(task)
        }
    }

    const editTask = async task => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await axiosclient.put(`/tasks/${task.id}`,task,config)
            const updatedProject = {...project}
            updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === data._id? data : taskState)
            setProject(updatedProject)
            setAlert({})
            setModalFormTask(false);
        } catch (error) {
            console.log(error)
        }
    }
    const createTask = async task => {
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

    const handleModalEditTask = task => {
        setTask(task);
        setModalFormTask(true);
    }

    const handleModalDeleteTask = task => {
        setTask(task)
        setModalDeleteTask(!modalDeleteTask)
    }

    const deleteTask = async () => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosclient.delete(`/tasks/${task._id}`,config)
            setAlert({
                msg:data.msg,
                error: false
            })
            const updatedProject = {...project}
            updatedProject.tasks = updatedProject.tasks.filter(taskState => taskState._id !== task._id)
            setProject(updatedProject)
            const {proj_updated} = await axiosclient.put(`/projects/${project._id}`,updatedProject,config);
            setModalDeleteTask(false);
            setTask({})
            setTimeout(() => {setAlert({})},1000)      
        } catch (error) {
            console.log(error)
        }
    }

    const submitCollaborator = async email => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        const {data} = await axiosclient.post('/projects/collaborators',{email},config);
        setCollaborator(data)
        setLoading(true)
        setAlert({
            msg: data.msg,
            error: false
        })
        } catch(error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {setAlert({})},2000)
        } finally {
            setLoading(false)
        }
    } 

    const addCollaborator = async email => {
        try{
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosclient.post(`/projects/collaborators/${project._id}`,email,config);
            
            setAlert({
                msg: data.msg,
                error: false
            })
            setCollaborator({})
            setTimeout(() => {
                setAlert({})
                navigate(`../projects/${project._id}`);
            },2000)

        } catch(error){
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {setAlert({})},2000)
        }
    }

    const handleModalDeleteCollaborator = (collaborator) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(collaborator)

    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosclient.post(`/projects/delete-collaborator/${project._id}`,{id: collaborator._id},config);
            const project_updated = {...project}
            project_updated.collaborators = project_updated.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id)
            setProject(project_updated);
            setAlert({
                msg: data.msg,
                error: false
            })
            setCollaborator({})
            setModalDeleteCollaborator(false)
            setTimeout(() => {setAlert({})},2000)
        } catch (error) {
            console.log(error.response)
        }
    }

    const doneTask = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axiosclient.post(`/tasks/state/${id}`,{},config)
            console.log(data)
            const updatedProject = {...project}
            updatedProject.tasks = updatedProject.tasks.map(taskState => 
                taskState._id === data._id ? data : taskState
            )
            console.log(updatedProject.tasks)
            setProject(updatedProject);
            setTask({});
            setAlert({});
        } catch (error) {
            console.log(error.response)            
        }
    }

    const handleFinder = () => {
        setFinder(!finder);
    }

    return(
        <ProjectsContext.Provider
            value={{
                projects,
                alert,
                project,
                loading,
                modalFormTask,
                modalDeleteTask,
                task,
                collaborator,
                modalDeleteCollaborator,
                finder,
                showAlert,
                submitProject,
                getProject,
                deleteProject,
                handleModalTask,
                submitTask,
                handleModalEditTask,
                handleModalDeleteTask,
                deleteTask,
                submitCollaborator,
                addCollaborator,
                handleModalDeleteCollaborator,
                deleteCollaborator,
                doneTask,
                handleFinder
            }}>{children}

        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext