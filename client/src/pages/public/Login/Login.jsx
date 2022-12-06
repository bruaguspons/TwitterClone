import React from 'react'
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import publicRoutes from '../../../routes/public.routes'
import LogoTwitter from '../../../components/LogoTwitter'
function Login() {
    const navigate = useNavigate()
    const handleSubmit = () => {

    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-max mx-auto  bg-slate-50 rounded-md py-6 px-4 text-center'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='w-10'>
                        <LogoTwitter color={'rgb(56 189 248)'} />
                        {/* <img className='w-10 h-10' src={Logo} alt="Twitter" /> */}
                    </div>

                    <Input type={'email'} name={'Email'} holder={"Your email"} Icon={AiOutlineMail} />
                    <Input type={'password'} name={'Password'} holder={"Your password"} Icon={AiFillLock} />

                    <Button text={"Login"} type={"submit"} />
                </form>
                <p className='mt-4 text-sm'>Have an account alredy? <button onClick={() => navigate(publicRoutes.SINGUP)} className='text-sky-400 '>Login</button></p>
            </div>
        </div>
    )
}

export default Login