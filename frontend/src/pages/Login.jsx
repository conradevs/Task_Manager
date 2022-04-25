import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alert from '../components/Alert';
import axiosclient from '../config/axiosclient';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    
    const {setAuth} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if([email,password].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true
            });
            return;
        }
        try {
            const {data} = await axiosclient.post('/users/login',{email,password})
            setAlert({
                msg:'Login successfully',
                error: false
            })
            console.log(data)
            localStorage.setItem('token',data.token);
            setAuth(data)
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
            <h1 className="text-sky-600 font-black text-6xl">Login and administrate your
                <span className="text-slate-700"> Projects</span>
            </h1>
            {msg && <Alert alert={alert}/>}
            <form 
                className="my-10 bg-white shadow rounded-lg px-10 py-5 space-y-3"
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
                        value ={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password"
                    >Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value ={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="Login"
                    className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 pl-3 text-slate-500 uppercase text-sm rounded hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
                    to="/register"
                >Sign In</Link>
                <Link
                    className="block text-center my-5 pr-3 text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
                    to="/forgot-password"
                >Forgot my password</Link>
            </nav>
        </>
     );
}
 
export default Login;