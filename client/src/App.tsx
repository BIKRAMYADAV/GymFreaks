import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Progress from "./pages/Progress"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import FindGyms from "./pages/FindGyms"
import Profile from "./pages/Profile"
function App() {
 

  return (
    <div>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/progress" element={<Progress/>}/>
    <Route path="/gyms" element={<FindGyms/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Routes>
    <ToastContainer position="top-center" autoClose={3000} />
 </div>
  )
}

export default App
