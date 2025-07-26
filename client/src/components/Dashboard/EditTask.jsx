// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
//   const [Values, setValues] = useState({
//     title: "",
//     description: "",
//     priority: "low",
//     status: "yetToStart",
//   });
//   const change = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...Values, [name]: value });
//   };

//   useEffect(() => {
//   const fetch = async () => {
//     try {
//       const res = await axios.get(`http://localhost:1000/api/v1/gettasks/${EditTaskId}`, {
//         withCredentials: true,
//       });
//       setValues(res.data.taskDetails);
//     } catch (err) {
//       console.error("Failed to fetch task", err);
//     }
//   };
//   fetch();
// }, []);


// const editTask = async (e,id) => {
//   e.preventDefault();
//   try {
//     const res = await axios.put(
//       `http://localhost:1000/api/v1/edittasks/${id}`,
//       Values,
//       { withCredentials: true }
//     );
//     alert(res.data.success);
//     window.sessionStorage.removeItem("editTaskId");
//     setEditTaskDiv("hidden");
//     window.location.reload();
//   } catch (error) {
//     alert(error.response?.data?.error || "Edit failed");
//   }
// };

//   console.log("Deleting task with ID:", Values._id);

// const deleteTask = async (e, id) => {
//     e.preventDefault();
//     try {
//       const res = await axios.delete(
//         `http://localhost:1000/api/v1/deletetasks/${id}`,
//         { withCredentials: true }
//       );
//       alert(res.data.success);
//       window.sessionStorage.removeItem("editTaskId");


//       setEditTaskDiv("hidden");
//       window.location.reload();
//     } catch (error) {
//       alert(error.response?.data?.error || "Failed to delete task");

//     }
//   };
//   return (
//     <div className=" bg-white rounded px-4  py-4 w-[40%]">
//       <h1 className="text-center font-semibold text-xl">Edit Task</h1>
//       <hr className="mb-4 mt-2" />
//       <form action="" className="flex flex-col gap-4">
//         <input
//           type="text"
//           className=" border px-2 py-1 rounded  border-zinc-300 outline-none"
//           placeholder="title"
//           name="title"
//           value={Values.title}
//           onChange={change}
//         />
//         <div className=" flex items-center justify-between gap-4">
//           <div className=" w-full">
//             <h3 className="mb-2">Select Priority</h3>
//             <select
//               name="priority"
//               id=""
//               className=" border px-2 py-1 rounded border-zinc-300  outline-none w-full"
//               onChange={change}
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//           <div className=" w-full">
//             <h3 className="mb-2">Select Status</h3>
//             <select
//               name="status"
//               id=""
//               className=" border px-2 py-1 rounded border-zinc-300  outline-none w-full"
//               onChange={change}
//             >
//               <option value="yetToStart">Yet to Start</option>
//               <option value="inProgress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>
//         <textarea
//           name="description"
//           id=""
//           placeholder="Description"
//           className=" border px-2 py-1 rounded  border-zinc-300 outline-none h-[20vh]"
//           value={Values.description}
//           onChange={change}
//         ></textarea>
//         <div className=" flex items-center justify-between gap-4">
//           <button
//             className=" w-full bg-blue-800 hover:bg-blue-700 transition-all duration-300 text-white rounded"
//             onClick={(e)=>editTask(e,Values._id)}
//           >
//             Edit Task
//           </button>

//           <button
//             type="button"
//             className="w-full border border-black hover:bg-zinc-400 transition-all duration-300 rounded"
//             //  onClick={(e)=>deleteTask(e,Values._id)}
//             onClick={(e) => deleteTask(e, Values._id)

//             }

//           >
//             Delete Task
//           </button>
//                      <button
//       type="button"
//       className="w-full border border-black hover:bg-zinc-400 transition-all duration-300 rounded"
//       onClick={(event) =>{event.preventDefault();
//         window.sessionStorage.clear("editTaskId")
//          setEditTaskDiv("hidden")}
//       }
//     >
//       Cancel
//     </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditTask;




import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yetToStart",
  });

  // Fetch task only when EditTaskId is available
  useEffect(() => {
    if (!EditTaskId) return;
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/gettasks/${EditTaskId}`, {
          withCredentials: true,
        });
        setValues(res.data.taskDetails);
      } catch (err) {
        console.error("Failed to fetch task", err);
      }
    };
    fetch();
  }, [EditTaskId]);

  const change = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const editTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/edittasks/${EditTaskId}`,
        Values,
        { withCredentials: true }
      );
      alert(res.data.success);
      window.sessionStorage.removeItem("editTaskId");
      setEditTaskDiv("hidden");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || "Edit failed");
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:1000/api/v1/deletetasks/${EditTaskId}`,
        { withCredentials: true }
      );
      alert(res.data.success);
      window.sessionStorage.removeItem("editTaskId");
      setEditTaskDiv("hidden");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to delete task");
    }
  };

  return (
    <div className=" bg-white rounded px-4  py-4 w-[40%]">
      <h1 className="text-center font-semibold text-xl">Edit Task</h1>
      <hr className="mb-4 mt-2" />
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          className=" border px-2 py-1 rounded border-zinc-300 outline-none"
          placeholder="title"
          name="title"
          value={Values.title}
          onChange={change}
        />
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <h3 className="mb-2">Select Priority</h3>
            <select
              name="priority"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              value={Values.priority}
              onChange={change}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="w-full">
            <h3 className="mb-2">Select Status</h3>
            <select
              name="status"
              className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
              value={Values.status}
              onChange={change}
            >
              <option value="yetToStart">Yet to Start</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="border px-2 py-1 rounded border-zinc-300 outline-none h-[20vh]"
          value={Values.description}
          onChange={change}
        />
        <div className="flex items-center justify-between gap-4">
          <button
            className="w-full bg-blue-800 hover:bg-blue-700 text-white rounded"
            onClick={editTask}
          >
            Edit Task
          </button>
          <button
            type="button"
            className="w-full border border-black hover:bg-zinc-400 rounded"
            onClick={deleteTask}
          >
            Delete Task
          </button>
          <button
            type="button"
            className="w-full border border-black hover:bg-zinc-400 rounded"
            onClick={(e) => {
              e.preventDefault();
              window.sessionStorage.removeItem("editTaskId");
              setEditTaskDiv("hidden");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;

