import React from 'react'

const ProjectForm = () => {
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
        <label
            className='text-gray-700 uppercase font-bold text-sm'
            htmlFor='name'
        >Project Name</label>
        <input
            id="name"
            type="text"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Project Name"
        />
    </form>
  )
}

export default ProjectForm