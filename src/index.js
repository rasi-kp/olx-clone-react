import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Firebase} from './firebase/config'
import { FirebaseContext } from './store/firebasecontext';
import Context from './store/firebasecontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <FirebaseContext.Provider value={{Firebase:Firebase}}>
    <Context>

    <App />
    </Context>
    </FirebaseContext.Provider>
  // </React.StrictMode>
);
