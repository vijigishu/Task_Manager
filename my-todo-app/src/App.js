import {useState} from "react"
import './App.css';
 import bg from './assets/bg.jpg';
 import bg1 from"./assets/bg1.jpg";




function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  function handlechangeusername(e){
       setUsername(e.target.value);
      
   }

    function handlechangepassword(e){
       setPassword(e.target.value);
   }
   function handlechangecpassword(e){
       setcPassword(e.target.value);
   }
   function handlesignup(){
    if(username.length<6){
        window.alert("Username cannot be less than 6 digit");
        return;
       }
    if(password.length<6){
      window.alert("password cannot be less than 6 digit");
        return;
    }
    if(username.length>13){
      window.alert("Username too long");
        return;
    }
    if(password.length>13){
      window.alert("Password too long");
        return;
    }
    if(password!==cpassword){
      window.alert("Password does not match");
        return;
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
       <input id="cpass"type="text" placeholder="Confirm Password" value={cpassword} onChange ={handlechangecpassword} />
      </div>
      <button id="signup" onClick={handlesignup}>Signup</button>
    </div>

    </div>
  );
}

export default App;
