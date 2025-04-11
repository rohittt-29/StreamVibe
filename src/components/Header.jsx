import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';



const Header = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector(store => store.user)
const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)


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

  
  const handleGptSearch=()=>{
    dispatch(toggleGptSearchView())
  }


  const handleLanguageChange = (e) =>{
   dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className='absolute w-screen  px-15 py-7 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-60' src={LOGO} alt='logo' />
  
 { user && (
    <div className=''>
    { showGptSearch && (  <select className=' p-2 pl-4 pr-4 mt-7 mr-6 cursor-pointer text-black bg-white/60 font-semibold text-sm ' onChange={handleLanguageChange}  >
      {SUPPORTED_LANGUAGES.map(lang =>   <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}

      </select>)}
      
      <button onClick={handleGptSearch} className=' p-2 pl-6 pr-6 mt-7 mr-6 hover:bg-[#333333] text-white font-medium cursor-pointer rounded-lg bg-[#1A1A1A]/80'>{ showGptSearch ? "Home" : "Ask GPT"}</button>

    <button onClick={handleSignOut} className='p-2 pl-6 pr-6 mt-7 mr-6 hover:bg-red-500 text-white font-semibold cursor-pointer bg-[#E50000] rounded-lg '>Sign out</button>
  </div>
)}
    </div>
    
  )
}

export default Header
