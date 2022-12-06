import React from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import publicRoutes from '../../../routes/public.routes'
import LogoTwitter from '../../../components/LogoTwitter'
function Singup() {
    const navigate = useNavigate()
    const handleSubmit = () => {

    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-max mx-auto bg-slate-50 rounded-md py-6 px-4 text-center'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='w-10'>
                        <LogoTwitter color={'rgb(56 189 248)'} />
                    </div>

                    <Input type={'text'} name={'userName'} holder={"Username"} Icon={FaUserAlt} />
                    <Input type={'email'} name={'email'} holder={"Your email"} Icon={AiOutlineMail} />
                    <Input type={'password'} name={'password1'} holder={"Your password"} Icon={AiFillLock} />
                    <Input type={'password'} name={'password2'} holder={"Repeat your password"} Icon={AiFillLock} />

                    <Button text={"Sing Up"} type={"submit"} />
                </form>
                <p className='mt-4 text-sm'>Have an account alredy? <button onClick={() => navigate(publicRoutes.LOGIN)} className='text-sky-400 '>Login</button></p>
            </div>
        </div>
    )
}

export default Singup