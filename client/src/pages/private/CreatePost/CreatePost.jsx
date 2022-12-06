import React, { useRef } from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import LogoTwitter from '../../../components/LogoTwitter'
import { AiFillEdit, AiFillFileImage } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function CreatePost() {
    const navigate = useNavigate()
    const refContent = useRef()
    const refImage = useRef()
    const user = useSelector(state => state.user)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/posts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                post: {
                    content: refContent.current.value,
                    // password: refPass.current.value
                }
            })
        })
        if (res.status === 200) {
            navigate('/')
        } else {
            e.target.reset()
        }
    }
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-max mx-auto  bg-slate-50 rounded-md py-6 px-4 text-center shadow-lg'>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <div className='w-10'>
                        <LogoTwitter color={'rgb(56 189 248)'} />
                        {/* <img className='w-10 h-10' src={Logo} alt="Twitter" /> */}
                    </div>
                    <textarea ref={refContent} name="" id="" cols="30" rows="10" placeholder={`✎Write something...`} className='focus:outline-sky-400 p-2'></textarea>
                    <Input refer={refImage} type={'file'} name={'Image'} holder={"Your password"} Icon={AiFillFileImage} />

                    <Button text={"Add"} type={"submit"} />
                </form>
            </div>
        </div >
    )
}

export default CreatePost