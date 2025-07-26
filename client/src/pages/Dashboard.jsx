import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import EditTask from "../components/Dashboard/EditTask";
import Stacktitle from "../components/Dashboard/Stacktitle";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
const Dashboard = () => {
  const [addTaskDiv, setaddTaskDiv] = useState("hidden");
  const [Tasks, setTasks] = useState();
  const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
  const [EditTaskId, setEditTaskId] = useState();  
  useEffect(() => {
    const fechUserDetails = async () => {
      try {
        const res = await axios.get(
          `https://taskmanager-project-qgba.onrender.comapi/v1/userDetails`,

          { withCredentials: true, }
        );
        // console.log(res);
        setTasks(res.data.tasks);
      } catch (err) {}
    };
    fechUserDetails();

    const id = window.sessionStorage.getItem("editTaskId");
  if (id) {
    setEditTaskDiv("block");
    setEditTaskId(id);
  }


  }, [addTaskDiv]);
  //  console.log(Tasks);
  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setaddTaskDiv={setaddTaskDiv} />
      </div>

      <div className=" px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto ">
        <div className="w-1/3">
          <Stacktitle title={"yetToStart"} />
          <div className="pt-2">
            {Tasks && <YetToStart task={Tasks[0].yetToStart} />}
          </div>
        </div>
        <div className="w-1/3">
          <Stacktitle title={"inProcess"} />
          <div className="pt-2">
            {Tasks && <InProgress task={Tasks[1].inProgress} />}
          </div>
        </div>
        <div className="w-1/3">
          <Stacktitle title={"completed"} />
         <div className="pt-2">
            {Tasks && <Completed task={Tasks[2].Completed} />}
          
          </div>
        </div>
      </div>

      {/*-----------------------------------------------------------*/}
      <div
        id="a"
        className={`w-full ${addTaskDiv}    h-screen  fixed  top-0  left-0 bg-zinc-800  opacity-85`}
      ></div>
      <div
        id="b"
        className={`w-full ${addTaskDiv}   h-screen  fixed  top-0  left-0 flex items-center justify-center`}
      >
        <AddTask setaddTaskDiv={setaddTaskDiv} />
      </div>
     <div
        id="a"
        className={`w-full ${EditTaskDiv}    h-screen  fixed  top-0  left-0 bg-zinc-800  opacity-85`}
      ></div>
      <div
        id="b"
        className={`w-full ${EditTaskDiv}   h-screen  fixed  top-0  left-0 flex items-center justify-center`}
      >
       {EditTaskId && ( <EditTask  EditTaskId ={EditTaskId}  setEditTaskDiv={setEditTaskDiv} />)}
      </div>
    </div>  
  
  );
};

export default Dashboard;
