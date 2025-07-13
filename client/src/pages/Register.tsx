import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { apiUrl } from '../utils';
import { toast } from 'react-toastify';

function Register() {
//   const { login } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl+'register', form);
      navigate('/');
      toast.success('registration successful !');
    } catch (err) { 
      toast.error('registration failed !');
    }
  };

  return (
    <div className='h-screen flex justify-center items-center bg-black'>
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-black text-white shadow-md rounded">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="block w-full mb-3 border border-white rounded-2xl p-2"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="block w-full mb-3 border rounded-2xl p-2"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="block w-full mb-3 border rounded-2xl p-2"
      />
      <div className='flex flex-col justify-center items-center'>
      <button type="submit" className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded">
        Register
      </button>
      <p className='text-blue-400 hover:text-blue-600'>
        <Link to='/'>or login instead ?</Link>
      </p>
      </div>
    </form>
    </div>
  );
}

export default Register;
