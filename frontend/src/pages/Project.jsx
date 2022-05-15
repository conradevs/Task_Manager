import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom"
import useProjects from "../hooks/useProjects";
import ModalFormTask from '../components/ModalFormTask'
import ModalDeleteTask from '../components/ModalDeleteTask'
import Task from '../components/Task'
import Alert from '../components/Alert';

const Project = () => {
  const params=useParams();
  
  const {project,getProject, loading,handleModalTask,alert} = useProjects();

  useEffect(() => {
      getProject(params.id)
  },[])
  
  const {name} = project
  if (loading) return 'loading...'
  const {msg} = alert
  return (  
    <>
      <div className='flex justify-between'>

        <h1 className='font-black text-4xl'>{name}</h1>

        <div className='flex items-center gap-2 text-gray-400 hover:text-gray-800'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
          </svg>
          <Link
            to={`/projects/edit/${params.id}`}
            className='uppercase font-bold'
          >Edit</Link>
        </div>

      </div>
      <button
        onClick={handleModalTask}
        type='button'
        className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center' 
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        New task</button>
        <p className='font-bold text-xl mt-10'>Project Tasks</p>
        <div className='flex justify-center'>
          <div className='w-full md:w-1/3 lg:w-1/4'>
            {msg && <Alert alert={alert} />}
          </div>
        </div>
        <div className='bg-white shadow mt-10 rounded-lg'>
          {project.tasks?.length ?
            project.tasks?.map(task => (
              <Task
                key={task._id}
                task={task}
              />
            )) :
            <p className='text-center my-5 p-10'>There are not tasks in this project</p>}
        </div>
        <ModalFormTask/>
        <ModalDeleteTask/>
    </>
  )
}

export default Project