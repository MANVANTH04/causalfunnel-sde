import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Quiz from './Components/Quiz'
import { Route, BrowserRouter, Router } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <div className="min-h-screen bg-gray-900">
      <Quiz />
    </div>

    </>
  )
}

export default App
