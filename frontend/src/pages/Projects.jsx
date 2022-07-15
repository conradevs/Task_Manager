import useProjects from "../hooks/useProjects"
import ProjectPreview from "../components/ProjectPreview";
import Alert from "../components/Alert";

const Projects = () => {

    const {projects, alert} = useProjects();
    
    const {msg} = alert
    return (
    <>
        <h1 className='text-4xl font-black'>Projects</h1>
        {msg && <Alert alert={alert}/>}
        <div className='bg-white shadow mt-10 rounded-lg p-5'>
          {projects.length ?
            projects.map(project => (
              <ProjectPreview
                key={project._id}
                project={project}
              />
            )) 
            : <p className='mt-5 text-center text-gray-600 uppercase'>There are no projects yet</p>}
        </div>
    </>
  )
}

export default Projects