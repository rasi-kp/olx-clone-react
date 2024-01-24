import React from 'react';
import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/firebasecontext';
import {auth,firestore}  from '../../firebase/config';
import {sign  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import {collection,addDoc} from "firebase/firestore"

function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    const ref=await addDoc(collection(firestore,"users"),{
      id: user.uid,  
      username: username,
      phone: phone, 
    });
    navigate('/login');
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onClick={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onClick={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
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
