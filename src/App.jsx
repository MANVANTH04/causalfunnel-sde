import Login from './pages/Login'
import Signup from './pages/Signup'
import Quiz from './Components/Quiz'
import Results from "./pages/Results"
import Test from "./pages/Test"
import Home from "./pages/Home"
import {  BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen bg-gray-900">
    <div>Home | Test | Login | Signup</div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path = "/Test" element={<Test/>}/>
      <Route path = "/Results" element = {<Results/>}/>
      <Route path = "/Signup " element = {<Signup/>}/>
      <Route path = "/Login" element = {<Login/>}/>
    </Routes>
  
    </BrowserRouter>
    </div>

    </>
  )
}

export default App
