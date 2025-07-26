import React from 'react'
import AddTask from './AddTask';
const TaskCard = ({data}) => {
  const  ShowEditDiv =(e,id) =>{
    e.preventDefault();
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  }
  return (
    <button className=' bg-white rounded px-4 w-[100%] py-2 hover:shadow transition-all duration-100' onClick={(event) => ShowEditDiv(event, data._id)}>
        <div className=' flex items-center justify-between'>
            <h1 > {data.title}</h1>
            <div className={` text-sm ${data.priority === "low" ? "text-green-500 bg-green-100" : data.priority === "medium" ? "text-yellow-500 bg-yellow-100" : "text-red-500 bg-red-100"} px-2 rounded-full`}>
                <p>{data.priority}</p>
            </div>
        </div>
        <hr className="my-2" />
        <p className='text-sm text-black-500 text-start'>{data.description}</p>
        {/* <p  className='text-sm text-black-500 text-start'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia soluta facilis nemo unde neque corporis aperiam!</p> */}
    </button>
  )
};

export default TaskCard;
