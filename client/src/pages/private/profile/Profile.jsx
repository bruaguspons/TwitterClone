import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import Button from '../../../components/Button'
function Profile() {
    const { userprofile } = useParams()
    const user = useSelector(state => state.user)
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

    useEffect(() => {
        getUserProfile()
    }, [])
    return (
        <div className='w-full flex flex-col items-center'>
            {
                !userPro.image ? <div className='bg-slate-200 p-4 rounded-full border-2 border-black w-min h-min '><FaUserAlt className='w-10 h-10' /></div> :
                    <div className=" w-20 h-20 rounded-full border-2 border-black">
                        <img src={userPro.image} alt="UserImage" />
                    </div>
            }
            {
                userPro.userName === user.userName && <Button text={'Change Profile Image'} />
            }
            <h3>{userPro.userName}</h3>
            {
                userPro.userName === user.userName && <Button text={'Change UserName'} />
            }
            {
                userPro.bio ? <p>{userPro.bio}</p> :
                    <span>This user doesn't have a bio.</span>
            }
            {
                userPro.userName === user.userName && <Button text={'Change Bio'} />
            }
        </div>
    )
}

export default Profile