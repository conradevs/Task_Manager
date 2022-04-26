import { useState , useEffect, createContext} from 'react';
import axiosclient from '../config/axiosclient';

const ProjectsContext = createContext();

const ProjectsProvider = ({children}) => {

    const [projects, setProjects] = useState([]);

    return(
        <ProjectsContext.Provider
            value={{
                projects
            }}>{children}

        </ProjectsContext.Provider>
    )
}

export {
    ProjectsProvider
}

export default ProjectsContext