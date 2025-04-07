import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector(store => store.user)


  const handleSignOut = () =>{
signOut(auth).then(() => {
  // Sign-out successful.
  dispatch(removeUser());

}).catch((error) => {
  // An error happened.
});
  }

  useEffect(()=>{
   const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email , displayName, photoURL } = user;
        dispatch(addUser({uid: uid,
           email: email, 
          displayName: displayName ,
           photoURL: photoURL}
          ));
          navigate('/browse');
       
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unSubscribe(); // Unsubscribe on unmount
  },[])
  return (
    <div className='absolute w-screen  px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-45' src={LOGO} alt='logo' />
  
 { user && (<div>

    <button onClick={handleSignOut} className='p-2 pl-4 pr-4 mt-7 mr-6 hover:bg-red-500 text-white font-semibold cursor-pointer bg-red-700'>Sign out</button>
  </div>
)}
    </div>
    
  )
}

export default Header
