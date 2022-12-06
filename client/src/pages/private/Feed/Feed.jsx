import React from 'react'
import Post from './components/Post'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Spinner from '../../../components/Spinner'
import { usePostContext } from './context/postContext'
function Feed() {
    const user = useSelector(state => state.user)
    const { posts, setPosts } = usePostContext()
    const [loading, setLoading] = useState(true)

    const getFeed = async () => {
        const res = await fetch('http://localhost:8000/posts/feed', {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const data = await res.json()
        setPosts(data)
        setLoading(false)
    }
    useEffect(() => {
        getFeed()
    }, [])
    return (
        <div className=' h-min w-full flex overflow-hidden justify-center'>
            <div className=" hidden mb-4 min-w-max h-min rounded-lg bg-slate-50 overflow-hidden shadow-lg md:flex flex-col items-center p-4">
                {
                    !user.img ? <div className='bg-slate-200 rounded-full w-20 h-20'></div> :
                        <div className=" w-20 h-20 rounded-full">
                            <img src={user.img} alt="UserImage" />
                        </div>
                }
                <h3>{user.userName}</h3>
                <h4>{user.email}</h4>
                <p>{user.bio || "you don't have an bio"}</p>
                <span>Following: {user.followingNum || 0}</span>
                <span>Followers: {user.followersNum || 0}</span>
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
                    <h3 className='mx-2'>Who to follow?</h3>
                </div>
            </div>
        </div>
    )
}

export default Feed