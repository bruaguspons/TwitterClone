import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoTwitter from '../../components/LogoTwitter'
import privateRoutes from '../../routes/private.routes'
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../../redux/state/userSlice'
function Navbar() {
    const user = useSelector(state => state.user)
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <header className="w-full bg-sky-400 text-gray-100 mb-4 shadow-sm">

            <div className="container mx-auto flex justify-between items-center py-3 px-5">
                {/* Site logo and Name */}
                <button onClick={() => navigate(privateRoutes.FEED)} className="flex flex-shrink-0 title-font font-medium items-center text-gray-900 md:mb-0">
                    <div className='w-10'>
                        <LogoTwitter color={'white'} />
                    </div>
                    <span className="ml-3 text-xl text-gray-100 font-semibold antialiased">Twitter Clone</span>
                </button>
                {/* Navbar */}
                <nav className="hidden md:ml-auto md:flex flex-wrap items-center justify-center text-base tracking-wide font-bold">
                    <button className="py-2 px-4 mx-1 rounded-lg hover:text-sky-500 hover:bg-slate-200" onClick={() => {
                        setIsOpen(false)
                        navigate(privateRoutes.CREATEPOST)
                    }}>New Post</button>
                    <button className="py-2 px-4 mx-1 rounded-lg hover:text-sky-500 hover:bg-slate-200" onClick={() => {
                        setIsOpen(false)
                        dispatcher(resetUser())
                        navigate('/')
                    }}>Log Out</button>
                </nav>

                <button className="hidden sm:inline-flex ml-auto md:ml-0 mr-4 md:mr-0 cursor-pointer border-4 rounded-full p-1" title='Profile' onClick={() => {
                    setIsOpen(false)
                    navigate(`${privateRoutes.PROFILE}/${user.userName}`)
                }}>
                    <FaUserAlt />
                </button>

                <button
                    className="md:hidden active:outline-none focus:outline-none w-8 h-8"
                    onClick={() => setIsOpen(!isOpen)}
                >{
                        isOpen ? <AiOutlineClose className='w-full h-full' /> :
                            <AiOutlineMenu className='w-full h-full' />
                    }
                </button>
            </div>


            {isOpen &&
                <div className="absolute z-50 w-full flex flex-col py-4 px-3 md:hidden bg-sky-500 text-base uppercase text-center font-semibold">
                    <a href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-sky-400">Profile</a>
                    <button href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-sky-400" onClick={() => {
                        setIsOpen(false)
                        navigate(privateRoutes.CREATEPOST)
                    }}>New Post</button>
                    <a href="#link" className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-sky-400">Search</a>
                    <button className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-sky-400" onClick={() => {
                        setIsOpen(false)
                        dispatcher(resetUser())
                        navigate('/')
                    }}>Log Out</button>
                </div>
            }

        </header>
    )
}

export default Navbar