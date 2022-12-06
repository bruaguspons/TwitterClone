import React from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import publicRoutes from '../../../routes/public.routes'
import LogoTwitter from '../../../components/LogoTwitter'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/state/userSlice'
function Singup() {
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const refEmail = useRef()
    const refUserName = useRef()
    const refPassword1 = useRef()
    const refPassword2 = useRef()
    const handleSubmit = async (e) => {
        console.log(refUserName.current.value, refEmail.current.value, refPassword1.current.value, refPassword2.current.value)
        e.preventDefault()
        const res = await fetch('http://localhost:8000/user', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: {
                    userName: refUserName.current.value,
                    email: refEmail.current.value,
                    password1: refPassword1.current.value,
                    password2: refPassword2.current.value,
                }
            })
        })
        const data = await res.json()
        if (res.status === 400) {
            e.target.reset()
        } else if (res.status === 200) {
            dispatcher(createUser(data.user))
            navigate('/')
        }
        console.log(data)
    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-max mx-auto bg-slate-50 rounded-md py-6 px-4 text-center shadow-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='w-10'>
                        <LogoTwitter color={'rgb(56 189 248)'} />
                    </div>

                    <Input refer={refUserName} type={'text'} name={'userName'} holder={"Username"} Icon={FaUserAlt} />
                    <Input refer={refEmail} type={'email'} name={'email'} holder={"Your email"} Icon={AiOutlineMail} />
                    <Input refer={refPassword1} type={'password'} name={'password1'} holder={"Your password"} Icon={AiFillLock} />
                    <Input refer={refPassword2} type={'password'} name={'password2'} holder={"Repeat your password"} Icon={AiFillLock} />

                    <Button text={"Sing Up"} type={"submit"} />
                </form>
                <p className='mt-4 text-sm'>Have an account alredy? <button onClick={() => navigate(publicRoutes.LOGIN)} className='text-sky-400 '>Login</button></p>
            </div>
        </div>
    )
}

export default Singup