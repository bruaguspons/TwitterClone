import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import privateRoutes from './routes/private.routes'
import AuthGuard from './Guards/auth.guards'
import publicRoutes from './routes/public.routes'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={privateRoutes.PRIVATE} />} />
        <Route element={<AuthGuard />} >
          <Route path={privateRoutes.PRIVATE} />
        </Route>
        <Route path={publicRoutes.LOGIN} element={<Login />} />
        <Route path={publicRoutes.SINGUP} element={<Singup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
