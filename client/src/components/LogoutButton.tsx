import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function LogoutButton() {
    const navigate = useNavigate();
    

    const handleLogout = () => {
        console.log('handle logout was hit')
        localStorage.removeItem('token')
        navigate('/')
        toast.success('logged out successfully')
    }

  return (
    <button onClick={handleLogout}
    className='bg-red-500 text-white px-2 h-7 rounded hover:bg-red-600 transition'>
        Logout
    </button>
  )
}

export default LogoutButton