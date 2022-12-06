import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import privateRoutes from './routes/private.routes'
import AuthGuard from './Guards/auth.guards'
import publicRoutes from './routes/public.routes'
import Login from './pages/public/Login/Login'
import Singup from './pages/public/Singup/Singup'
import Private from './pages/private/Private'
function App() {

  return (
    <BrowserRouter>
      <div className='w-screen bg-slate-200'>
        <Routes>
          <Route path='/' element={<Navigate to={privateRoutes.PRIVATE} />} />
          <Route element={<AuthGuard />} >
            <Route path={`${privateRoutes.PRIVATE}/*`} element={<Private />} />
          </Route>
          <Route path={publicRoutes.LOGIN} element={<Login />} />
          <Route path={publicRoutes.SINGUP} element={<Singup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
