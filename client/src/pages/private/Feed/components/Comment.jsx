import React from 'react'

function Comment({ comment }) {
    return (
        <div className='w-full bg-sky-400 rounded-lg px-4 py-4 text-slate-50 font-semibold'>
            <div className='flex items-center gap-4'>
                <img src={comment.author.img} alt={`${comment.author.userName}-Image`} />
                <span>{comment.author.userName}</span>
            </div>
            <p>{comment.content}</p>
        </div>
    )
}

export default Comment