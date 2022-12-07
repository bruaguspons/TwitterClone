import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaUserAlt, FaEdit, FaMedal } from 'react-icons/fa'
import Button from '../../../components/Button'
import { useRef } from 'react'
import { updateUser } from '../../../redux/state/userSlice'
import privateRoutes from '../../../routes/private.routes'
function Profile() {
    const navigate = useNavigate()
    const inputRef = useRef()
    const dispatcher = useDispatch()
    const { userprofile } = useParams()
    const user = useSelector(state => state.user)
    const [edit, setEdit] = useState({
        password: false,
        email: false,
        bio: false,
        userName: false,
        image: false
    })
    const [userPro, setUserPro] = useState({})
    const getUserProfile = async () => {
        const res = await fetch(`http://localhost:8000/profile/${userprofile}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        if (res.status === 200) {
            const data = await res.json()
            setUserPro(data.profile)
            console.log(data)
        }
    }

    const handleFollow = async () => {
        let res
        if (userPro.following) {
            res = await fetch(`http://localhost:8000/profile/follow/${userPro.userName}`, {
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
        } else {
            res = await fetch(`http://localhost:8000/profile/follow/${userPro.userName}`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
        }
        if (res.status === 200) {
            const data = await res.json()
            console.log(data)
            setUserPro(data.profile)
        }
    }
    const HandleEdit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        if (inputRef.current.name === "file") {
            data.append('file', inputRef.current.files[0])
        } else {
            data.append('content', JSON.stringify({
                user: {
                    [inputRef.current.name]: inputRef.current.value,
                }
            }))
        }
        const res = await fetch('http://localhost:8000/user', {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
            body: data
        })
        if (res.status === 200) {
            const dataRes = await res.json()
            dispatcher(updateUser(dataRes.user))
            setEdit({ password: false, email: false, userName: false, bio: false, image: false })
            if (inputRef.current.name === "userName") {
                navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.PROFILE}/${dataRes.user.userName}`, { replace: true })
                navigate(0)
            } else {
                getUserProfile()
            }
        }

    }
    useEffect(() => {
        getUserProfile()
    }, [])
    return (
        <div className='w-full flex flex-col items-center'>
            {/* Image User */}
            {
                !userPro.image ? <div className='bg-slate-200 p-4 rounded-full border-2 border-black w-min h-min '><FaUserAlt className='w-10 h-10' /></div> :
                    <img className=' object-cover w-20 h-20 rounded-full border-4 border-black' src={`http://localhost:8000/${userPro.image}`} alt="UserImage" />
            }
            {
                !edit.image ? userPro.userName === user.userName && <button className='flex items-center' onClick={() => {
                    setEdit({ password: false, email: false, userName: false, bio: false, image: true })
                }}><FaEdit /><span>Change Image</span></button> :
                    <form onSubmit={HandleEdit} className='flex flex-col items-center'>
                        <input ref={inputRef} type="file" name="file" id="" />
                        <Button text={"Change"} type={"submit"} />
                    </form>

            }

            {/* User name */}
            <h3 className='text-2xl font-bold mt-3'>{userPro.userName}</h3>
            {
                !edit.userName ? userPro.userName === user.userName && <button className='flex items-center' onClick={() => {
                    setEdit({ password: false, email: false, userName: true, bio: false, image: false })
                }}><FaEdit /><span>Change User Name</span></button> :
                    <form onSubmit={HandleEdit} className='flex flex-col items-center'>
                        <textarea ref={inputRef} className='my-3 focus:outline-sky-400 p-2' name="userName" id="" defaultValue={user.userName}></textarea>
                        <Button text={"Change"} type={"submit"} />
                    </form>
            }

            {/* User Email */}
            {
                userPro.userName === user.userName && <p className='text-xl font-semibold mt-3'>{user.email}</p>

            }
            {
                !edit.email ? userPro.userName === user.userName && <button className='flex items-center' onClick={() => {
                    setEdit({ password: false, email: true, userName: false, bio: false, image: false })
                }}><FaEdit /><span>Change Email</span></button> :
                    <form onSubmit={HandleEdit} className='flex flex-col items-center'>
                        <input className='my-3 focus:outline-sky-400 p-2' ref={inputRef} type="email" name="email" id="" defaultValue={user.email} />
                        <Button text={"Change"} type={"submit"} />
                    </form>
            }
            {/* User Password */}
            {
                !edit.password ? userPro.userName === user.userName && <button className='flex items-center' onClick={() => {
                    setEdit({ password: true, email: false, userName: false, bio: false, image: false })
                }}><FaEdit /><span>Change Password</span></button> :
                    <form onSubmit={HandleEdit} className='flex flex-col items-center'>
                        <input className='my-3 focus:outline-sky-400 p-2' ref={inputRef} type="password" name="password" id="" />
                        <Button text={"Change"} type={"submit"} />
                    </form>
            }
            {/* User Bio */}
            {
                userPro.bio ? <p className='text-xl font-semibold mt-3'>{userPro.bio}</p> :
                    <span className='text-xl font-semibold mt-3'>This user doesn't have a bio.</span>
            }
            {
                !edit.bio ? userPro.userName === user.userName && <button className='flex items-center' onClick={() => {
                    setEdit({ password: false, email: false, userName: false, bio: true, image: false })
                }}><FaEdit /><span>Change Bio</span></button> :
                    <form onSubmit={HandleEdit} className='flex flex-col items-center'>
                        <textarea ref={inputRef} className='my-3 focus:outline-sky-400 p-2' name="bio" id="" defaultValue={user.bio}></textarea>
                        <Button text={"Change"} type={"submit"} />
                    </form>
            }

            {/* Follow Buttons */}
            {
                userPro.userName !== user.userName && !userPro.following && <div className='mt-3' onClick={handleFollow}><Button text={"Follow"} /></div>
            }
            {
                userPro.userName !== user.userName && userPro.following && <div className='mt-3' onClick={handleFollow}><Button colorButton={"red-500"} text={"UnFollow"} /></div>
            }
        </div>
    )
}

export default Profile