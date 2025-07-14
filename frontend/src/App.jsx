import { useQuery } from '@tanstack/react-query'
import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/authPages/LoginPage'
import RegisterPage from './pages/authPages/RegisterPage'
import DashboardPage from './pages/dashboardPages/DashboardPage'
import ProtectedRoute from './components/auth/ProtectRoute'
import AdminProtectedRoute from './components/auth/AdminProtectedRoute'
import AdminPage from './pages/adminPage/AdminPage'

function App() {
  
 

  return (
   
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute>} />
      <Route path='admin' element={<AdminProtectedRoute> <AdminPage /> </AdminProtectedRoute>} />
      <Route path='/' element={<Navigate to='/login' replace />} /> 
    </Routes>
  )
}

export default App
