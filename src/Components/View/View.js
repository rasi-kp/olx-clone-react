import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { firestore } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { PostContext } from '../../store/ViewContext';
import { FirebaseContext } from '../../store/firebasecontext';
function View() {
  const [userDetails,setUserDetails]=useState()
  const postDetails=useContext(PostContext)
  const {firebase}=useContext(FirebaseContext)

  useEffect(() => {
    const {userId} =postDetails.postDetails
    console.log(userDetails);
    console.log('User ID:', userId);
    const fetchUserDetails = async () => {
      try {
        const userRef = doc(firestore, 'users',"KUDTQjzNXyg1SBD993tnGt6FSUu2"); 
        console.log('User Document Reference:', userRef);
        const userDoc = await getDoc(userRef);
        setUserDetails(userDoc.data())

      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  },[]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.postDetails.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.postDetails.price} </p>
          <span>{postDetails.postDetails.name}</span>
          <p>{postDetails.postDetails.category}</p>
          <span>{postDetails.postDetails.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails}</p>
          <p>{userDetails}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
