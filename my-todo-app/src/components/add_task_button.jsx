import { useState } from "react";
import "../App.css";


export default function AddTask({onClick}){
   
  return(
    <div>
    <button className="add_button" onClick={onClick}>
    Add Task</button>
    
    </div>
  )
}