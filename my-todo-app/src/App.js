
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin"; 
import customer_dashboard from "./customer_dashboard";
import AddTask from "./components/add_task_button";
import TaskField from "./components/task_field";

function App() {
  return (
   
    <Routes>
      <Route path="/" element={<TaskField/>} />
       <Route path="/signin" element={<Signin/>} />
       <Route path="/customer_dashboard" element={<customer_dashboard/>}/>
       
    </Routes>
   
  )
}

export default App;
