import React from 'react'
import { Link } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import Finder from './Finder'

const Header = () => {
    const {handleFinder} = useProjects();
    return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className="md:flex md: justify-between">
            <h2 className= "text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                TaskManager
            </h2>
            <input 
                type="search"
                placeholder="Search Project"
                className="rounded-lg lg:w-96 block p-2 border"
                />
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <button
                        type="button"
                        className="font-bold uppercase"
                        onClick={handleFinder}
                    >Find Project</button>
                    <Link
                        to="/projects"
                        className="font-bold uppercase"
                    >Projects</Link>
                    <button
                        type="button"
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                    >LogOut</button>
                    <Finder/>
                </div>
        </div>
    </header>
  )
}

export default Header