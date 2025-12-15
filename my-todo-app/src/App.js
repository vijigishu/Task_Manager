
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin"; 
import Customerdashboard from "./customer_dashboard";


function App() {
  return (
   
    <Routes>
      <Route path="/" element={<Signup/>} />
       <Route path="/signin" element={<Signin/>} />
       <Route path="/customer_dashboard" element={<Customerdashboard/>}/>
       
    </Routes>
   
  )
}

export default App;
