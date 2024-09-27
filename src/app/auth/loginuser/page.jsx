"use client"


import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebase';
import Link from "next/link"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);




  const handleLogin = async (e) => {
    e.preventDefault();
      try {
        // Attempt to sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Check if the user is authenticated and if displayName is available
        if (user.displayName) {
          console.log('User logged in:', user.displayName);
        } else {
          console.log('No display name available for this user.');
        }
  
      // const user = userCredential.user;
      // Get the user's display name
      // setUserName(user.displayName || 'User');

      window.location.href = ''; // Redirect to a protected page after login
    } catch (error) {
      setError("Enter valid credientials");
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserName(user.displayName || 'User');
        // Redirect to dashboard if logged in
        window.location.href = '/dashboard';
      }
    });

    return () => unsubscribe();
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          
          {error ? ( <p className="text-red-500">{error}</p>)
                    :(<p className="text-transparent">Enter valid credientia</p>) }
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Dont have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

