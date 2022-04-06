import { Link } from "react-router-dom";

export const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl">Reset your 
          <span className="text-slate-700"> password</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg px-10 py-5 space-y-3">
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
              />
          </div>
          <input
              type="submit"
              value="Save new password"
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
  )
}

export default NewPassword;