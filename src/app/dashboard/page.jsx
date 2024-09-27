"use client"


import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
// import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

const Dashboard = () => {
    
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user is logged in and get their details
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the user's name if available
        setUserName(user.displayName || 'not retrieved');
      } else {
        // If no user is logged in, redirect to login page
        window.location.href = '/login';
      }
    });

    return () => unsubscribe();
  }, []);


  useEffect(() => {
    // Disable back button after login
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    return () => {
      // Cleanup the event listener when component unmounts
      window.onpopstate = null;
    };
  }, []);

  
  useEffect(() => {
    // Only run this code on the client side
    setIsMounted(true);

    if (isMounted) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          window.location.href= '/auth/loginuser'; // Redirect to login if not authenticated
        }
      });

      return () => unsubscribe(); // Cleanup the listener when component unmounts
    }
  }, [isMounted]);

  // Show loading or placeholder content until the component is mounted
  if (!isMounted) {
    return <div>Loading...</div>;
  }


  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after sign out
      window.location.href = '/auth/loginuser';
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return( 
  
    <>
    
  {/* <div>Welcome to your Dashboard</div> */}
  <h1>Welcome, {userName}!</h1>

  <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
  Logout
</button>
</>
  )
};

export default Dashboard;
