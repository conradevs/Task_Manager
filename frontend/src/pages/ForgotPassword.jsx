import {useState} from 'react';
import { Link } from "react-router-dom"
import axiosclient from '../config/axiosclient';
import Alert from '../components/Alert';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});
    
    const handleSubmit = async e => {
        e.preventDefault();
        if(email === '' || email.length < 6) {
            setAlert({
                msg: 'Email is required',
                error: true
            });
            return
        }
        try {
            const {data} = await  axiosclient.post(`/users/forgot-password`,{email})
            setAlert({
                msg: data.msg,
                error: false
            })
        } catch(error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }
    
    const {msg} = alert
    return ( 
    <>
      <h1 className="text-sky-600 font-black text-6xl">Set new
          <span className="text-slate-700"> password</span>
      </h1>
      {msg && <Alert alert={alert}/>}
      <form className="my-10 bg-white shadow rounded-lg px-10 py-5 space-y-3"
        onSubmit={handleSubmit}
      >
          <div>
              <label 
                  className="uppercase text-gray-600 block text-xl font-bold"
                  htmlFor="email"
              >Email</label>
              <input
                  id="email"
                  type="email"
                  placeholder="register email"
                  className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
          </div>
          <input
              type="submit"
              value="send instructions"
              className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
      </form>
      <nav className="lg:flex lg:justify-between">
          <Link
              className="block text-center my-5 pl-3 text-slate-500 uppercase text-sm rounded hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
              to="/"
          >Already have an account? Login</Link>
          <Link
              className="block text-center my-5 pl-3 text-slate-500 uppercase text-sm rounded hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
              to="/register"
          >Sign In</Link>
      </nav>
    </>
  )
}

export default ForgotPassword