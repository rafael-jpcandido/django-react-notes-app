import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
// nao use '/home' em web por motivos de segurança

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout () {
  localStorage.clear()
  return <Register />
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<RegisterAndLogout />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/logout" element={<Logout />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
