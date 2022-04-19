import {useState} from 'react'
import {Link} from 'react-router-dom'
import Alert from '../components/Alert'
import axios from 'axios'
const Register = () => {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState('')
    
    const handleSubmit = async e => {
        e.preventDefault();
        if([user,email,password,repeatPassword].includes('')) {
            setAlert({
                msg: 'All fields are required',
                error: true 
            })
            return 
        }
        if(password !== repeatPassword) {
            setAlert({
                msg: 'Password and repeat password must be the same',
                error: true 
            })
            return 
        }
        if(password.length < 6) {
            setAlert({
                msg: 'Password must have at least 6 characters',
                error: true 
            })
            return 
        }
        setAlert({})

        // Creating user into API
        try {
             const response = await axios.post('http://localhost:4000/api/users',{user,email,password})
             console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const {msg} = alert
    return ( 
        <>
            <h1 className="text-sky-600 font-black text-6xl">Create Account and administrate your
                <span className="text-slate-700"> Projects</span>
            </h1>
            {msg && <Alert alert={alert}/>}
            <form 
                className="my-10 bg-white shadow rounded-lg px-10 py-5 space-y-3"
                onSubmit = {handleSubmit}
            >
                <div>
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="name"
                    >Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your user name"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                </div>
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label 
                        className="uppercase text-gray-600 block text-xl font-bold"
                        htmlFor="password2"
                    >Repeat password</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Repeat your password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="Create Account"
                    className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-5 pl-3 text-slate-500 uppercase text-sm rounded hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
                    to="/"
                >Already have an account? Login</Link>
                <Link
                    className="block text-center my-5 pr-3 text-slate-500 uppercase text-sm hover:cursor-pointer hover:text-white hover:bg-sky-800 transition-colors"
                    to="/forgot-password"
                >Forgot my password</Link>
            </nav>
        </>
     );
}
 
export default Register;