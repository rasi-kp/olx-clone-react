import React,{useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import {auth}  from '../../firebase/config';
import {signOut} from 'firebase/auth';
import { AuthContext, FirebaseContext } from '../../store/firebasecontext';
import { Navigate, useNavigate } from 'react-router-dom'
function Header() {
  const handleLoginClick = () => {
    if (!user) {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  };
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text"
          placeholder='India' />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find cars,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" onClick={handleLoginClick}>
          <span>{user ? user.email: 'Login'}</span>
          <hr />
        </div>
          {user && <span onClick={()=>{
            signOut(auth)
            navigate('/login');
          }}>Logout</span>}

        <div className="sellMenu" onClick={()=>navigate('/sell')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
