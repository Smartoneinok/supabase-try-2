import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [boxUserId, setBoxUserId] = useState('');
  const [boxAccessToken, setBoxAccessToken] = useState('');
  const [boxRefreshToken, setBoxRefreshToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        const user = data.user;
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([{ 
            id: user.id, 
            email, 
            box_user_id: boxUserId, 
            box_access_token: boxAccessToken, 
            box_refresh_token: boxRefreshToken 
          }]);
        if (insertError) {
          setMessage(insertError.message);
          return;
        }
        setMessage('Sign up successful. You can now log in.');
        navigate('/login');
      } else {
        setMessage(data.error.message);
      }
    } catch (error) {
      console.error('Sign up failed', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="mt-4 p-2 border rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mt-4 p-2 border rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="mt-4 p-2 border rounded w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Box User ID"
          className="mt-4 p-2 border rounded w-full"
          value={boxUserId}
          onChange={(e) => setBoxUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Box Access Token"
          className="mt-4 p-2 border rounded w-full"
          value={boxAccessToken}
          onChange={(e) => setBoxAccessToken(e.target.value)}
        />
        <input
          type="text"
          placeholder="Box Refresh Token"
          className="mt-4 p-2 border rounded w-full"
          value={boxRefreshToken}
          onChange={(e) => setBoxRefreshToken(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-red-500">{message}</p>
      </div>
    </div>
  );
};

export default SignUp;
