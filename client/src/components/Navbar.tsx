
import LogoutButton from './LogoutButton'


function Navbar() {
  return (
     <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">GymFreaks</h1>
      <LogoutButton />
    </nav>
  )
}

export default Navbar