import React from 'react';
import {IoLogOutOutline} from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({setaddTaskDiv}) => {
const navigate = useNavigate();
  const logout = async ()=> {
    try {
      const res = await axios.post(
        `https://taskmanager-project-qgba.onrender.comapi/v1/logout`,
       {},
       {withCredentials:true}
      );
      alert(res.data.message);
    localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      console.log(error);
      // navigate("/login");
    }
  }
  return (
    <div className='flex px-12 py-4 items-center justify-between border-b '>
    
      <div className="flex items-center justify-center h-18 ">
  <h1 className="text-5xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-400 ">
    Mytask
  </h1>
</div>




        <div className='flex gap-8'>
            <button className=' hover:text-blue-800 transition-all duration-300' onClick={()=>setaddTaskDiv("block")}>
                Add Task 
                </button>
                <button  className=' text-2xl hover:text-red-600 transition-all duration-300' onClick={logout}>
                    <IoLogOutOutline />
                </button>
            </div>
    </div>
  )
}

export default Header ;