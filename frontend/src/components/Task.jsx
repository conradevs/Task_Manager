import { dateFormat } from "../helpers/dateFormat"
const Task = ({task}) => {
  
    const {description,name,priority,deadLine,state,_id} = task
    return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p className='mb-2 text-xl'>{name}</p>
            <p className='mb-2 text-gray-500 uppercase'>{description}</p>
            <p className='mb-2 text-xl'>{dateFormat(deadLine)}</p>
            <p className='mb-2 text-gray-600'>{priority}</p>
        </div>
        <div className='flex gap-2'>
            <button
                className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
            >Edit</button>
            {state? ( 
                <button
                    className='bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
                >Done</button>
            ): (<button
                    className='bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
                >Incomplete</button>
            )}
            <button
                className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
            >Delete</button>
        </div>
    </div>
  )
}

export default Task