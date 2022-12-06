import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import Comment from './components/Comment'
import Post from './components/Post'

function PostInfo() {
    const user = useSelector(state => state.user)

    const { slug } = useParams()
    const refContent = useRef()

    const [post, setPost] = useState({})
    const [comments, setComments] = useState({})
    const [loading, setLoading] = useState({
        post: true,
        comment: true
    })
    const getSinglePost = async () => {
        const res = await fetch(`http://localhost:8000/posts/${slug}`)
        const data = await res.json()
        setPost(data)

        setLoading(curr => {
            return { ...curr, post: false }
        })
        if (data) {
            const resComment = await fetch(`http://localhost:8000/posts/${slug}/comments`)
            const dataComment = await resComment.json()
            setComments(dataComment)
            setLoading(curr => {
                return { ...curr, comment: false }
            })
        }
    }

    useEffect(() => {
        getSinglePost()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:8000/posts/${post.slug}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ content: refContent.current.value })
        })
        if (res.status === 200) {
            e.target.reset()
            getSinglePost()
        }
    }
    return (
        <div className='pb-4'>
            {
                loading.post ? <div className='w-full flex justify-center'><Spinner /></div> :
                    < Post post={post} />
            }
            <div className=' mx-4 mb-4 rounded-lg bg-slate-50 overflow-hidden shadow-lg px-4 flex flex-col items-center'>
                <h3>Comments:</h3>
                {
                    loading.comment ? <Spinner /> :

                        comments.count ?
                            comments.comments.map(comment => (
                                <Comment key={comment.id} comment={comment} />
                            )) :
                            <span>No Comments</span>
                }
                <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
                    <textarea ref={refContent} name="" id="" placeholder={`✎Write something...`} className='focus:outline-sky-400 p-2 w-full h-36 mb-4'></textarea>
                    <div className='mb-4'>
                        <Button text={"Add"} type={"submit"} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostInfo