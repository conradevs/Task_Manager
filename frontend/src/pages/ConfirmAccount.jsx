import {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/Alert'

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({})
  const [confirmedAccount,setConfirmedAccount] = useState(false)
  
  const params = useParams();
  const {id} = params
  
  useEffect(() => {
    const confirmAccount = async () => {
      try{
        const url = `http://localhost:4000/api/users/confirmation/${id}`
        const {data} = await axios(url)

        setAlert({
          msg: data.msg,
          error: false
        })
        setConfirmedAccount(true)
      } catch(error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount();
  },[])
  const {msg} = alert
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Confirm your 
          <span className="text-slate-700"> Account</span>
      </h1>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alert}/>}
        {confirmedAccount && (
          <Link
            className="block text-center my-5 pl-3 text-slate-500 uppercase text-sm rounded hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
            to="/"
          >Login</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount