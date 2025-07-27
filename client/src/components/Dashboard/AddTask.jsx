import React,{useState}from 'react';
import axios from 'axios';

const AddTask = ({setaddTaskDiv}) => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority:"low",
    status:"yetToStart"
  });
  const change = (e) =>{
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  }
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://taskmanager-project-qgba.onrender.com/api/v1/addtasks`,
        Values,
        { withCredentials: true }
      );
      alert(res.data.success);
      setValues({
  title: "",
  description: "",
  priority: "low",
  status: "yetToStart"
});

      setaddTaskDiv("hidden");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div className=' bg-white rounded px-4  py-4 w-[40%]'>
        <h1 className="text-center font-semibold text-xl">Add Task</h1>
        <hr className="mb-4 mt-2" />
        <form action="" className ="flex flex-col gap-4">
            <input type="text" 
            className=" border px-2 py-1 rounded  border-zinc-300 outline-none"
            placeholder='title'
            name="title"
            value = {Values.title}
             onChange={change}
            />
            <div className=" flex items-center justify-between gap-4">
                <div className =" w-full">
                    <h3 className ="mb-2">Select Priority</h3>
                    <select name="priority"
                     id="" className = " border px-2 py-1 rounded border-zinc-300  outline-none w-full" 
                      onChange={change}
                     >
                        <option value="low"  >Low</option>
                        <option value="medium">Medium</option>
                        <option value="high" >High</option>

                     </select>
                </div>
                                <div className =" w-full">
                    <h3 className ="mb-2">Select Status</h3>
                    <select name="status"
                     id="" className = " border px-2 py-1 rounded border-zinc-300  outline-none w-full" 
                      onChange={change}
                     >
                        <option value="yetToStart"  >Yet to Start</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed" >Completed</option>

                     </select>
                </div>
            </div>
                <textarea name="description" id="" placeholder='Description'  className=" border px-2 py-1 rounded  border-zinc-300 outline-none h-[20vh]"  
                value = {Values.description} onChange={change}></textarea>
                <div className=" flex items-center justify-between gap-4">
                  <button className=' w-full bg-blue-800 hover:bg-blue-700 transition-all duration-300 text-white rounded' onClick={addTask}>Add Task
                  </button>
                 <button
      type="button"
      className="w-full border border-black hover:bg-zinc-400 transition-all duration-300 rounded"
      onClick={() => setaddTaskDiv("hidden")}
    >
      Cancel
    </button>
                </div>
        </form>




    </div>
  )
}

export default AddTask;
