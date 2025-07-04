import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
function App() {
 

  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/progress" element={<h1>bikram</h1>}/>
    <Route path="/gyms" element={<h1>bikram</h1>}/>
    <Route path="/profile" element={<h1>bikram</h1>}/>
    </Routes>
  )
}

export default App
