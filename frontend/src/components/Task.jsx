import { dateFormat } from "../helpers/dateFormat"
import useProjects from '../hooks/useProjects'
import useAdmin from "../hooks/useAdmin"

const Task = ({task}) => {
    const admin = useAdmin();
    const {handleModalEditTask, handleModalDeleteTask, doneTask} = useProjects()
    const {description,name,priority,deadLine,state,_id} = task
    return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className='mb-2 text-xl'>{name}</p>
            <p className='mb-2 text-gray-500 uppercase'>{description}</p>
            <p className='mb-2 text-sm'>{dateFormat(deadLine)}</p>
            <p className='mb-2 text-gray-600'>{priority}</p>
        </div>
        <div className='flex gap-2'>
            {admin && (
                <button
                    className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
                    onClick ={() => handleModalEditTask(task)}
                >Edit</button>
            )}
            <button
                className={`${state ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                onClick ={() => doneTask(_id)}
            >{state ? 'Done' : 'Incomplete'}</button>  
            {admin && (
                <button
                    className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
                    onClick={() => handleModalDeleteTask(task)}
                >Delete</button>
            )}
        </div>
    </div>
  )
}

export default Task