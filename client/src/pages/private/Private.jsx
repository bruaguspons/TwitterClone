import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import privateRoutes from '../../routes/private.routes'
import Feed from './Feed/Feed'
import Navbar from './Navbar'

function Private() {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='container mx-auto'>
                <Routes>
                    <Route path='/' element={<Navigate to={privateRoutes.FEED} />} />
                    <Route path={privateRoutes.FEED} element={<Feed />} />
                </Routes>
            </div>
        </div>
    )
}

export default Private