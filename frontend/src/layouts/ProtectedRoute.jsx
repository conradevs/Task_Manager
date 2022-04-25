import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ProtectedRoute = () => {
    const{auth,loading} = useAuth();
    console.log(auth, loading);
    if(loading) return 'Loading...'
    return (
    <div>
        {auth._id ? 
            (
                <div  className='bg-gray-100'>
                    <Header/>
                    <div className = 'md:flex md:min-h-screen'>
                        <Sidebar/>
                        <main className='p-10 flex-1'>
                            <Outlet/>
                        </main>
                    </div>
                </div>
            ) : <Navigate to="/"/>}
    </div>
  )
}

export default ProtectedRoute