import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Deposit from './pages/Deposit.jsx'
import Signup from './pages/Signup.jsx'
import Withdrawal from './pages/Withdrawal.jsx'
import { AuthProvider } from './AuthProvider'; // Adjust path accordingly

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
              </AuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
