import { useState } from "react";
import "../App.css";


export default function Showtasks({tasks}){
   if (!tasks || !Array.isArray(tasks)) {
    return <p>Loading tasks...</p>;
  }
    return(
        <div className="tasktable">
     <table >
      <thead className="tablehead" >
       <tr>
        <th>
            Title
        </th>
        <th>
            Description
        </th>
       </tr>

      </thead>
      <tbody>
     {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
          </tr>
        ))}

      </tbody>
         



     </table>

    </div>
    
    )



}

