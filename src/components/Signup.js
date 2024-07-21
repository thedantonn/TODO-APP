// src/components/Signup.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simple signup logic for demonstration
    if (email && password) {
      dispatch(setUser({ email }));
      navigate('/todos');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
