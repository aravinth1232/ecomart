// pages/signup.js
"use client"

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../../firebase';
// import { useRouter } from 'next/router';
import { collection, addDoc } from 'firebase/firestore';
import Link from "next/link"
import { FaEye } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCpasswordVisible] = useState(false);

  const [error, setError] = useState(null);
//   const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email,
      });
      await updateProfile(user, {
        displayName: name, // Name from your sign-up form
      });

      window.location.href = '/dashboard'; // Redirect to dashboard after sign-up
    } catch (error) {
      setError("Enter valid credentials");
    }
  };

  return (
    <div className="flex items-start justify-center h-svh">
      <div className="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded">
        <h2 className="text-2xl font-bold text-center ">Sign Up</h2>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        {error ? ( <p className="text-red-500 pt-1 transition-all ease-out">{error}</p>)
                    :(<p className="text-transparent pt-1">Enter valid credientials</p>) }
        <form onSubmit={handleSignUp} >
          <div className='flex flex-col gap-3'>
          <div>
            {/* <label>Name:</label> */}
            <input
              placeholder='Name'
              type="text"
              autoComplete='on'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div>
            {/* <label>Email:</label> */}
            <input
            placeholder='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div className='relative'>
            {/* <label>Password:</label> */}
            <div className='relative'>
            <input
            placeholder='Password'
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />  
            <button
          onClick={() => setPasswordVisible(!passwordVisible)}
          type="button"
          className=" absolute right-3 top-[52%] transform -translate-y-1/2"
        >
          {passwordVisible ? (
            <FaEye className='text-tertiary' size={24} />
          ) : (
            <FaEye  size={24} />
          )}
        </button>

          </div>

          </div>


          <div>
            {/* <label>Confirm Password:</label> */}

            <div className='relative'>
            <input
            placeholder='Confirm Password'
              type={cpasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
            
            <button
          onClick={() => setCpasswordVisible(!cpasswordVisible)}
          type="button"
          className=" absolute right-3 top-[52%] transform -translate-y-1/2"
        >
          {cpasswordVisible ? (
            <FaEye className='text-tertiary' size={24} />
          ) : (
            <FaEye  size={24} />
          )}
        </button>


            </div>
          </div>
          
          </div>

          

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-primary rounded hover:bg-tertiary"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link
            href="/auth/loginuser"
            className="text-tertiary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
