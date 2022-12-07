import React from 'react'
import Post from './components/Post'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner'
import { FaUserAlt } from 'react-icons/fa'
import { usePostContext } from './context/postContext'
import { useNavigate } from 'react-router-dom'
import privateRoutes from '../../../routes/private.routes'
function Feed() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const { posts, setPosts } = usePostContext()
    const [loading, setLoading] = useState(true)
    const [randUser, setRandUser] = useState([])

    const getFeed = async () => {
        const res = await fetch('http://localhost:8000/posts/feed', {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const data = await res.json()
        setPosts(data)
        setLoading(false)
    }
    const getRandomUsers = async () => {
        const res = await fetch('http://localhost:8000/profile/random')
        if (res.status === 200) {
            const data = await res.json()
            setRandUser(data.users)
        }
    }

    useEffect(() => {
        getRandomUsers()
        getFeed()
    }, [])

    return (
        <div className=' h-min w-full flex overflow-hidden justify-center'>
            <div className=" hidden mb-4 min-w-max h-min rounded-lg bg-slate-50 overflow-hidden shadow-lg md:flex flex-col items-center p-4">
                {
                    !user.image ? <div className='bg-slate-200 p-4 rounded-full '><FaUserAlt className='w-10 h-10' /></div> :
                        <img className='w-20 h-20 rounded-full' src={`http://localhost:8000/${user.image}`} alt="UserImage" />
                }
                <h3>{user.userName}</h3>
                <h4>{user.email}</h4>
                <p>{user.bio || "you don't have an bio"}</p>
            </div>
            <div>
                {
                    loading ? <Spinner /> :
                        Object.keys(posts?.post).length > 0 ?
                            posts.post.map(post => (
                                <Post key={post.slug} post={post} />
                            )) : <span>No Post</span>

                }
            </div>
            <div className="hidden mb-4 h-min md:block rounded-lg bg-slate-50 shadow-lg">
                <div className='w-max'>
                    <h3 className='p-2 text-slate-50 bg-sky-400 w-full font-semibold'>Who to follow?</h3>
                    {
                        !(randUser.length > 0) ? <Spinner /> :
                            randUser.map(user => {
                                const image = user.image
                                const url = image?.startsWith('http') ? user.image : `http://localhost:8000/${user.image}`
                                return (
                                    <button key={user.userName} className='flex items-center gap-2' onClick={() => navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.PROFILE}/${user.userName}`)}>
                                        {
                                            !user.image ? <div className='bg-slate-200 p-2 rounded-full w-min my-2 ml-2'><FaUserAlt className='w-5 h-5' /></div> :

                                                <img className='w-8 h-8 rounded-full my-2 ml-2' src={url} alt="User Image" />
                                        }
                                        <span>{user.userName}</span>
                                    </button>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default Feed