import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../utils';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiUrl+'login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
      toast.success('successfully logged in !')
    } catch (err) {
      toast.error('Login failed !')
    }
  };

  return (
    <div className='h-screen flex justify-center items-center bg-black'>
    <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-black text-white p-4 rounded-2xl">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="block w-full mb-4 border p-2 rounded-2xl text-white"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="block w-full mb-4 border p-2 rounded-2xl text-white"
      />
      <div className='flex flex-col justify-center items-center'> 
      <button type="submit" className="bg-red-500 hover:bg-red-700 text-white px-4 py-1">Login</button>
      <p className='text-blue-400 hover:text-blue-600'>
        <Link to='/register'>or register instead ?</Link>
      </p>
</div>
    </form>
    </div>
  );
}

export default Login;
