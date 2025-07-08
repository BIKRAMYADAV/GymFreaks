import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Progress from "./pages/Progress"
import Register from "./pages/Register"
import Login from "./pages/Login"
function App() {
 

  return (
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/progress" element={<Progress/>}/>
    <Route path="/gyms" element={<h1>bikram</h1>}/>
    <Route path="/profile" element={<h1>bikram</h1>}/>
    </Routes>
  )
}

export default App
