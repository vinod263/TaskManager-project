import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();

  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://taskmanager-project-qgba.onrender.com/api/v1/login",
        Values,
        { withCredentials: true }
      );
      localStorage.setItem("userLoggedIn","yes");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
     <div className="flex h-screen flex-col items-center justify-center">
        <div className=" w-(60vw) md:w-(50vw) lg:w-(30vw)">
          <h1 className=" text-3xl font-bold text-center mb-1 text-blue-800">
            myTask
          </h1>
          <h3 className="text-center font-semibold text-zinc-900">
            login with myTask
          </h3>
        </div>
        <div className="w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4">
          <form className="flex flex-col gap-4" >
          
            <input
              type="email"
              required
              placeholder="email"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none   "
              name="email"
              value={Values.email}
              onChange={change}
            />
            <input
              type="password"
              required
              placeholder="password"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none   "
              name="password"
              value={Values.password}
              onChange={change}
            />
            <button
              className=" bg-blue-900 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
              type="submit"
              onClick={login}
            >
             login
            </button>
            <p className=" text-center font-semibold text-gray-900">
              don't have an account ? <Link to="/register" className=" text-blue-600 underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
  );
};

export default Login;
