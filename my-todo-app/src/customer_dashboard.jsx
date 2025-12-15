import {useState} from "react";
import { useEffect } from "react";
import './App.css';
import Navbar from "./components/navbar";
import Showtasks from "./components/show_tasks";
import TaskField from "./components/task_field";


function Customerdashboard(){
const [tasks,setTasks]=useState([]);
const [showModal,setShowModal]=useState(false);
useEffect(function(){
    async function fetchTasks(){
       const res= await fetch("/api/tasks",{
          credentials: "include",
       });
       const data= await res.json();
      
       setTasks(data);
    }
    fetchTasks();
},[]);

async function adding_tasks(title,description){
       const data={
        title:title,
        description:description
       }
       const response= await fetch("/api/add_tasks",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
          credentials: "include",
        body:JSON.stringify(data)

       })
       if(response.status===201){
        
       const savedTask = await response.json();

    setTasks(prev => prev.concat(savedTask));
       
        return true;
       }
       
    }
    
  return(
     <div>
        <Navbar/>
         <button className="plus" onClick={function(){setShowModal(true)}}>Add New Task ✙</button>
        <Showtasks tasks={tasks}/>
  
  
    {showModal && (
  <TaskField
    onClose={function () {
      setShowModal(false);
    }}
  
    adding_tasks={adding_tasks}
    
  />
)}
</div>
  )

  
}   


export default Customerdashboard;