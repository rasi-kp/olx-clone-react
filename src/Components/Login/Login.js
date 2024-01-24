import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/firebasecontext';
import {auth,firestore}  from '../../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import {collection,addDoc} from "firebase/firestore"

function Login() {
  const navigate = useNavigate();
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
    alert("Successfully login")
    const user = result.user;
    navigate('/');
    }catch(error){
      alert(error.message)
    }
    
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img  width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input 
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
