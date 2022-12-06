import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import privateRoutes from './routes/private.routes'
import AuthGuard from './Guards/auth.guards'
import publicRoutes from './routes/public.routes'
import storage from './redux/storage'
import { Provider } from 'react-redux'
import { Suspense, lazy } from 'react'
import Spinner from './components/Spinner'

function App() {
  const Private = lazy(() => import('./pages/private/Private'))
  const Singup = lazy(() => import('./pages/public/Singup/Singup'))
  const Login = lazy(() => import('./pages/public/Login/Login'))
  return (
    <Suspense fallback={<div className='w-full h-screen flex justify-center items-center bg-slate-200'><Spinner /></div>}>
      <Provider store={storage}>
        <BrowserRouter>
          <div className='w-full bg-slate-200'>
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
      </Provider>
    </Suspense>
  )
}

export default App
