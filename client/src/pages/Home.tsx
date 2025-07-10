import { Link } from "react-router-dom"
import LogoutButton from "../components/LogoutButton"

function Home() {
  return (

<div>
  <div className="absolute inset-0 bg-black"></div>

 <div className="relative z-10 text-white p-20 flex flex-col md:flex-row items-center justify-center gap-10 ">
  <div>
    <h1 className="text-7xl md:text-9xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r
      from-red-900 via-red-800 to-red-400 drop-shadow-lg opacity-100">
      GymFreaks
    </h1>
    <p className="mt-4 flex justify-center items-center text-lg opacity-50 text-center md:text-left">Track your fitness, protein, and progress.</p>
  </div>

  <div className="w-60 md:w-80">
    <img src="/imag4.png" alt="" />
  </div>
</div>

    <div className=" absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-10">
        <Link to="/progress">
          <button className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r  text-white text-lg font-semibold shadow-md hover:text-red-600 transition">
            Daily Progress
          </button>
        </Link>
        <Link to="/gyms">
          <button className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r  text-white text-lg font-semibold shadow-md hover:text-red-600 transition">
            Find Gyms
          </button>
        </Link>
        <Link to="/profile">
          <button className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r  text-white text-lg font-semibold shadow-md hover:text-red-600 transition">
            Profile
          </button>
        </Link>
         <button
    onClick={() => {/* your logout logic */}}
    className="cursor-pointer px-6 py-3 rounded-2xl text-lg shadow-md hover:scale-105 transition"
  >
   <LogoutButton/>
  </button>
        
      </div>
</div>

  )
}

export default Home