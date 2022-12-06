import React from 'react'

function Button({ text, type }) {
    return (
        <button type={type} className="group relative inline-flex items-center px-5 py-2.5 rounded shadow-lg outline-none bg-sky-400 text-white font-medium transition-all duration-200 ease-out hover:text-sky-400 hover:bg-transparent hover:shadow-none active:top-0.5 focus:outline-none">

            {/* span::before */}
            <span className="absolute h-0 w-0.5 right-0 top-0 bg-sky-400 transition-all duration-500 ease-out group-hover:h-full" aria-hidden="true" />
            <span className="absolute left-0 bottom-0 bg-sky-400 transition-all duration-500 ease-out w-0.5 h-0 group-hover:h-full" aria-hidden="true" />

            {text}

            {/* span::after */}
            <span className="absolute left-0 bottom-0 bg-sky-400 transition-all duration-500 ease-out w-0 h-0.5 group-hover:w-full" aria-hidden="true" />
            <span className="absolute w-0 h-0.5 right-0 top-0 bg-sky-400 transition-all duration-500 ease-out group-hover:w-full" aria-hidden="true" />

        </button>
    )
}

export default Button