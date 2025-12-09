
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin"; 



function App() {
  return (
   
    <Routes>
      <Route path="/" element={<Signup/>} />
       <Route path="/signin" element={<Signin/>} />
       
    </Routes>
   
  )
}

export default App;
