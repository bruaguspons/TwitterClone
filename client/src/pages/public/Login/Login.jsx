import React from 'react'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import publicRoutes from '../../../routes/public.routes'
import LogoTwitter from '../../../components/LogoTwitter'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/state/userSlice'
import privateRoutes from '../../../routes/private.routes'
function Login() {
    const navigate = useNavigate()
    const dispatcher = useDispatch()
    const refEmail = useRef()
    const refPass = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/user/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: {
                    email: refEmail.current.value,
                    password: refPass.current.value
                }
            })
        })
        if (res.status === 400) {
            e.target.reset()
        } else {

            const data = await res.json()
            console.log(data)
            dispatcher(createUser(data.user))
            navigate('/')
        }
    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-max mx-auto  bg-slate-50 rounded-md py-6 px-4 text-center shadow-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='w-10'>
                        <LogoTwitter color={'rgb(56 189 248)'} />
                        {/* <img className='w-10 h-10' src={Logo} alt="Twitter" /> */}
                    </div>

                    <Input refer={refEmail} type={'email'} name={'Email'} holder={"Your email"} Icon={AiOutlineMail} />
                    <Input refer={refPass} type={'password'} name={'Password'} holder={"Your password"} Icon={AiFillLock} />

                    <Button text={"Login"} type={"submit"} />
                </form>
                <p className='mt-4 text-sm'>Have an account alredy? <button onClick={() => navigate(publicRoutes.SINGUP)} className='text-sky-400 '>Sing Up</button></p>
            </div>
        </div>
    )
}

export default Login