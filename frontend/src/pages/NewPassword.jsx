import {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axiosclient from '../config/axiosclient';
import Alert from '../components/Alert';

export const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [validToken, setValidToken] = useState(false);
    const [alert, setAlert] = useState({})
    const [modifiedPassword, setModifiedPassword] = useState(false);
    const params = useParams()
    const {token} = params
    useEffect(() => {
        const validateToken = async () => {
            try{
                await axiosclient(`/users/forgot-password/${token}`)
                setValidToken(true)
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                  })
            }
        }
        validateToken()
    },[])

    const handleSubmit = async e => {
        e.preventDefault();
        if(password.length <6) { 
            setAlert({
                msg: 'The password must have at least 6 characters',
                error: true
            })
        }
        try{
            const url = `/users/forgot-password/${token}`
            const {data} = await axiosclient.post(url,{password})
            setAlert({
                msg: data.msg,
                errror: false
            })
            setModifiedPassword(true);
        } catch(error) {
            setAlert({
                msg:error.response.data.msg,
                error: true
            })    
        }
    }
    const {msg} = alert
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Reset your 
          <span className="text-slate-700"> password</span>
      </h1>
      {msg && <Alert alert={alert}/>}
      {validToken && (
        <form 
            className="my-10 bg-white shadow rounded-lg px-10 py-5 space-y-3"
            onSubmit={handleSubmit}
            >
          <div>
              <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="password"
              >New Password</label>
              <input
                  id="password"
                  type="password"
                  placeholder="type your new password"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
          </div>
          <input
              type="submit"
              value="Save new password"
              className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
        {modifiedPassword && (
          <Link
            className="block text-center my-5 pl-3 text-slate-500 uppercase text-sm rounded hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
            to="/"
          >Login</Link>
        )}
    </>
  )
}

export default NewPassword;