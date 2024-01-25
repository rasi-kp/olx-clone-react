import React, { Fragment, useContext, useState } from 'react';
import './Create.css';

import { FirebaseContext, AuthContext } from '../../store/firebasecontext';
import { firestore, storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from "firebase/firestore"
import Header from '../Header/Header';

const Create = () => {

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [product, setProduct] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const date = new Date()

  const onFileUpload = (e) => {
    if (!user) {
      navigate('/login')
    }
    else {
      e.preventDefault()
      const fileInput = e.target.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url)
            addDoc(collection(firestore, "products"), {
              userId: user.uid,
              name: product,
              category: category,
              price: price,
              image: url,
              createAt: date.toDateString()
            });
            navigate('/');
          });
        }
      );
      
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={onFileUpload}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required />
            <br />
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
            <br />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              required />
            <br />
            {
              imgUrl &&
              <div className='outerbar'>
                <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
              </div>
            }
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
