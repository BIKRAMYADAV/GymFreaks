import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import Progress from "./pages/Progress"
function App() {
 

  return (
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/progress" element={<Progress/>}/>
    <Route path="/gyms" element={<h1>bikram</h1>}/>
    <Route path="/profile" element={<h1>bikram</h1>}/>
    </Routes>
  )
}

export default App
