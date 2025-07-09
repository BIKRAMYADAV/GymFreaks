import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    const navigate = useNavigate();
    

    const handleLogout = () => {
        console.log('handle logout was hit')
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <button onClick={handleLogout}
    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>
        Logout
    </button>
  )
}

export default LogoutButton