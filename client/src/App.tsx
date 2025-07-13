import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Progress from "./pages/Progress"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    <div>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/progress" element={<Progress/>}/>
    <Route path="/gyms" element={<h1>bikram</h1>}/>
    <Route path="/profile" element={<h1>bikram</h1>}/>
    </Routes>
    <ToastContainer position="top-center" autoClose={3000} />
 </div>
  )
}

export default App
