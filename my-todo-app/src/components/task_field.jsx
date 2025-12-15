import { useState } from "react";
import "../App.css";
import AddTask from "./add_task_button";

export default function TaskField({onClose,adding_tasks}){
     const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    function change_title(e){
         setTitle(e.target.value);
    }
     function change_description(e){
         setDescription(e.target.value);
    }
    async function addtasks() {
        if(title && description){
            const res=await adding_tasks(title,description);
            console.log("ADD TASK RESULT:", res);
            if(res){
              onClose();
            }
        }
    }
  return(
    <div className="Modal_backdrop">
      <div className="modal" >
        <button className="cross" onClick={onClose} aria-label="Close">✖</button>
    <div width="200px" height="400px" className="task-field">
      
        <h1>Title</h1>
        <input className="input"placeholder="Title" type="text" value={title}
         onChange={change_title}/>
         <h1>Description</h1>
           <input className="input" placeholder="Description" type="text" value={description}
         onChange={change_description}/>
         <AddTask onClick={addtasks}  />
    </div>
    </div>
    </div>
    
  )
}