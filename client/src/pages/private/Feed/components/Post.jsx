import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import privateRoutes from '../../../../routes/private.routes'
import { getDateDiff, getDay } from '../../../../utils/getDate'
import { FaTrash, FaUserAlt } from 'react-icons/fa'
import { usePostContext } from '../context/postContext'
import { useState } from 'react'
function Post({ post }) {
    const user = useSelector(state => state.user)
    const [likes, setLikes] = useState({
        likesArray: post.favorire,
        userLikes: post.favorire.some(usersId => usersId === user.id)
    })
    const { posts, setPosts } = usePostContext()
    const navigate = useNavigate()



    const handleLike = async () => {
        const res = await fetch(`http://localhost:8000/posts/${post.slug}/favorite`, {
            method: "POST",
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        const data = await res.json()
        console.log(data)
        setLikes({
            likesArray: data.likes,
            userLikes: data.likes.some(usersId => usersId === user.id)
        })
    }

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:8000/posts/${post.slug}`, {
            method: "DELETE",
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        // const data = await res.json()
        // console.log(data)
        if (res.status === 204) {
            const rest = {
                count: posts.count - 1,
                post: posts.post.filter(postOld => postOld.slug !== post.slug)
            }
            posts.count
            setPosts(rest)
            navigate('/')
        }
    }
    const image = post.image
    const urlPost = image?.startsWith('http') ? image : `http://localhost:8000/${image}`
    const imageUser = post.author.image
    const urlUser = image?.startsWith('http') ? imageUser : `http://localhost:8000/${imageUser}`

    return (
        <div className=" mx-4 mb-4"> {/* Card container */}
            <div className="h-full rounded-lg bg-slate-50 overflow-hidden shadow-lg px-4 relative">

                {
                    post.author.userName === user.userName &&
                    <button onClick={handleDelete} className='absolute m-2 right-0 text-cyan-400 border-2 p-1 border-cyan-400 rounded-full hover:bg-red-500 hover:border-red-500 hover:text-slate-50'><FaTrash /></button>
                }


                <button className='flex my-3 items-center gap-3' onClick={() => navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.PROFILE}/${post.author.userName}`, { replace: true })}>
                    {
                        post.author.image ? <img className='w-12 h-12 md:w-10 md:h-10 rounded-full' src={urlUser} alt="" /> :
                            <div className='bg-slate-200 p-3 rounded-full'><FaUserAlt className='w-8 h-8 md:w-5 md:h-5  ' /></div>
                    }
                    <span>{post.author.userName}</span>
                </button>




                <p className="py-1 line-clamp-6 mb-3 overflow-hidden leading-relaxed text-gray-000 cursor-pointer">{post?.content || ''}</p>
                {
                    post.image && <img className="lg:h-48 md:h-44 w-full object-scale-down object-center" src={urlPost} alt="Post-Image" />
                }

                {/* :CARD FOOTER */}
                <div className="pt-1 pb-4 flex justify-between items-center flex-wrap">
                    {/* ::Date & reading time */}
                    <div className="flex flex-wrap text-sm text-gray-700">
                        <span className="mr-1">{getDay(post?.createdAt)}</span>
                        <span className="">&#183; {getDateDiff(post?.createdAt)}</span>
                    </div>
                    <div className="mt-1 text-gray-400 leading-none text-sm flex items-center">
                        <button onClick={() => navigate(`/${privateRoutes.PRIVATE}/${privateRoutes.POST}/${post.slug}`, { replace: true })}>
                            <span className='h-5 mr-3 pr-3 border-r-2 border-gray-200'>💬Chat</span>
                        </button>

                        {/* Views */}
                        <button onClick={handleLike}>
                            <span className="inline-flex items-center cursor-pointer">
                                {likes.likesArray.length}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={`${likes.userLikes ? 'red' : 'currentColor'}`} style={{ fill: `${likes.userLikes ? 'red' : 'transparent'}` }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Post