import React from 'react'
import { useNavigate } from 'react-router-dom'
import privateRoutes from '../../../../routes/private.routes'
import { getDateDiff, getDay } from '../../../../utils/getDate'

function Post({ post }) {
    const navigate = useNavigate()
    return (
        <div className=" mx-4 mb-4"> {/* Card container */}
            <div className="h-full rounded-lg bg-slate-50 overflow-hidden shadow-lg px-4">


                {/* :CARD CATEGORY */}
                <h2 className="pt-4 pb-1 inline-block title-font text-xs font-bold text-sky-400 uppercase tracking-widest cursor-pointer hover:font-bold">My Category</h2>


                <p className="py-1 line-clamp-6 mb-3 overflow-hidden leading-relaxed text-gray-000 cursor-pointer">{post?.content || ''}</p>

                <img className="lg:h-48 md:h-44 w-full object-scale-down object-center" src="https://fancytailwind.com/static/9e8be5587c42e1f7ebec77c5a333a3a4/17574/city2.webp" alt="blog" />

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
                        <span className=" mr-3 inline-flex items-center pr-3 border-r-2 border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            1.5K
                        </span>
                        {/* Views */}
                        <span className="inline-flex items-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ fill: "red" }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            10
                        </span>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Post