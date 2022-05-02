import useProjects from "../hooks/useProjects"
import ProjectPreview from "../components/ProjectPreview";
const Projects = () => {

    const {projects} = useProjects();

    return (
    <>
        <h1 className='text-4xl font-black'>Projects</h1>
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