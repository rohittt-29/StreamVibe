import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const [isSignForm , setisSignForm] = useState(true)
  const ToggleSignInForm = () =>{
    setisSignForm(!isSignForm)
  }
  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img  src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2019/11/hipertextual-si-te-vas-netflix-no-olvides-descargar-mi-actividad-mi-lista-2019814675.jpg?w=1500&quality=70&strip=all&ssl=1" alt='bg'/>
    </div>
    <form className='w-3/12 absolute p-10  bg-black/75  my-28 mx-auto right-0 left-0 text-white rounded-lg '>
     <h1 className='text-white text-3xl mb-5  font-semibold'>{isSignForm? "Sign in" : "Sign Up"}</h1>
     {!isSignForm && (      <input type="text" placeholder='Full Name' className='p-4 mb-2 mt-2 w-full bg-gray-700/75 text-white  ' />)}
      <input type="text" placeholder='Email Address' className='p-4 mt-2 w-full bg-gray-700/75 text-white  ' />
      <input type="password" placeholder='Password' className='p-4 mt-4 w-full bg-gray-700/75 text-white ' />
      <button className='p-2 mt-6 text-white w-full bg-red-900 hover:bg-red-600 pl-8 pr-8 rounded cursor-pointer'>{isSignForm? "Sign in" : "Sign Up"}</button>
      <h2 className='text-center mt-3'>OR</h2>
      <button className='p-2 mt-4 text-white w-full bg-gray-700 hover:bg-gray-600 opacity-100 pl-8 pr-8 rounded cursor-pointer'>Use a sign-in code</button>
      <h2 className='underline underline-offset-1 text-center mt-4 cursor-pointer hover:text-blue-500'>Forget Password?</h2>
<div className="flex items-center mt-4">
  <input type="checkbox" id="remember" className="w-4 h-4" />
  <label htmlFor="remember" className="ml-2 text-white">Remember Me</label>
</div>
      <h2 className='mt-4 cursor-pointer hover:text-blue-500' onClick={ToggleSignInForm}>{isSignForm? "New to Netflix? Sign Up Now" : "Already Have an account? Sign In"}</h2>
    </form>
      
    </div>
  )
}

export default Login
