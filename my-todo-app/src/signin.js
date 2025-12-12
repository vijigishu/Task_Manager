import {useState} from "react"
import { useNavigate } from "react-router-dom";
import './App.css';
 import bg from './assets/bg.jpg';
 import bg1 from"./assets/bg1.jpg";

 function Signin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const navigate=useNavigate();
  function handlechangeusername(e){
       setUsername(e.target.value);
      
   }

    function handlechangepassword(e){
       setPassword(e.target.value);
   }
  
async function handlesignin(){
   
    const data={
        username:username,
        password:password
      };

    const response=await fetch("http://localhost:5000/api/signin",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      
      body: JSON.stringify(data)
    });
    
    if(response.status===400){
      window.alert("user not registered");
      navigate("/");
      return;
    }
    if(response.status===401){
      window.alert("Wrong password");
      
      return;
    }
    if(response.status===500){
      window.alert("Server error , please try again later");
      return;
    }
    if(response.status===201){
      navigate("/customer_dashboard");
    }
    
}
  return (

    <div style={{
        backgroundImage: `url(${bg1})`,
        width: 1500,
        height: 780,
        padding: 1,
      }}>
    <div id="signup_box" style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div id="userinfo">
        <div id="taskm">
        Task Manager
        </div>
        
      <input id="uname"type="text" placeholder="Enter username" value={username} onChange ={handlechangeusername} />
       <input id="passw"type="text" placeholder="Enter Password" value={password} onChange ={handlechangepassword} />
      
      </div>
      <button id="signup" onClick={handlesignin}>Signin</button>
    </div>

    </div>
  );
}
export default Signin;