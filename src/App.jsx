import Login from './pages/Login'
import Signup from './pages/Signup'
import Quiz from './Components/Quiz'
import Results from "./pages/Results"
import Test from "./pages/Test"
import Home from "./pages/Home"
import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import PrivateRoute from './Components/PrivateRouter'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen bg-gray-900">
    <div>Home | Test | Login | Signup | email:- random1user802@gmail.com | pass :- 12345678</div>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/' element= {<PrivateRoute> <Home/> </PrivateRoute>}/>
      <Route path = "/Test" element={<PrivateRoute>   <Test/> </PrivateRoute>}/>
      <Route path = "/Results" element = {<PrivateRoute>  <Results/> </PrivateRoute>}/>
      <Route path = "/signup " element = {<Signup/>}/>
      <Route path = "/Login" element = {<Login/>}/>
    </Routes>
    </AuthProvider>
  
    </BrowserRouter>
    </div>

    </>
  )
}

export default App
