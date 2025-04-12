import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/Validate';
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constants';

const Login = () => {
  const [isSignForm , setisSignForm] = useState(true);
  const [errorMessage , seterrorMessage] = useState(null);

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleBtnClick = () =>{
    // checkValidateData(email , password)
  
  const message =   checkValidateData(email.current.value , password.current.value, name?.current?.value)
 seterrorMessage(message);
 
 if(message) return;

 if(!isSignForm){
  createUserWithEmailAndPassword(auth,email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      const {uid, email , displayName, photoURL } = auth.currentUser;
       dispatch(addUser({uid: uid,
         email: email,
         displayName: displayName , 
        photoURL: photoURL}));

      // ...
    }).catch((error) => {
      // An error occurred
      seterrorMessage(error.message); 
      // ...
    });
   
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode+ "-" + errorMessage);
    // ..
  });
 }
 else{
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    navigate('/browse');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    seterrorMessage(errorCode+ "-" + errorMessage);
  });

 }

  }


  const ToggleSignInForm = () =>{
    setisSignForm(!isSignForm)
  }
  return (
    <div>
      <Header/>
      <div className='fixed  inset-0 -z-10 '>
      <img className=' w-full  h-screen object-cover  bg-black' src= {BG_URL}alt='bg'/>
    </div>
    <form onSubmit={(e) => e.preventDefault()} className= ' w-full md:w-3/12 absolute p-7  bg-black/90 border-4 border-gray-400 mt-40 md:my-20 mx-auto right-0 left-0 text-white rounded-lg '>
     <h1 className='text-white text-3xl mb-5  font-semibold'>{isSignForm? "Sign in" : "Sign Up"}</h1>
     {!isSignForm && (      <input ref={name} type="text" placeholder='Full Name' className='p-4 mb-2 mt-2 w-full bg-[#1A1A1A] text-white  ' />)}
      <input ref={email} type="text" placeholder='Email Address' className='p-4 mt-2 w-full bg-[#1A1A1A] text-white  ' />
      <input ref={password} type="password" placeholder='Password' className='p-4 mt-4 w-full bg-[#1A1A1A] text-white ' />
      <p className='text-red-500 text-bold text-lg mt-1 py-2'>{errorMessage}</p>
      <button className='p-2 mt-6 text-white w-full bg-[#E50000] hover:bg-red-400 pl-8 pr-8 rounded cursor-pointer' onClick={handleBtnClick}>{isSignForm? "Sign in" : "Sign Up"}</button>
      <h2 className='text-center mt-3'>OR</h2>
      <button className='p-2 mt-4 text-white w-full bg-gray-700 hover:bg-gray-600 opacity-100 pl-8 pr-8 rounded cursor-pointer'>Use a sign-in code</button>
      <h2 className='underline underline-offset-1 text-center mt-4 cursor-pointer hover:text-blue-500'>Forget Password?</h2>
<div className="flex items-center mt-4">
  <input type="checkbox" id="remember" className="w-4 h-4" />
  <label htmlFor="remember" className="ml-2 text-white">Remember Me</label>
</div>
      <h2 className='mt-4 cursor-pointer hover:text-blue-500' onClick={ToggleSignInForm}>{isSignForm? "New to StreamVibe? Sign Up Now" : "Already Have an account? Sign In"}</h2>
    </form>
      
    </div>
  )
}

export default Login
