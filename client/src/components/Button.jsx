import React from 'react'

function Button({ text, type, colorButton }) {
    const color = colorButton || "sky-400"
    return (
        <button type={type} className={`group relative inline-flex items-center px-5 py-2.5 rounded shadow-lg outline-none text-white font-medium transition-all duration-200 ease-out hover:bg-transparent hover:shadow-none active:top-0.5 focus:outline-none ${colorButton === "red" ? "hover:text-red-500 bg-red-500" : "hover:text-sky-400 bg-sky-400"}`}>

            {/* span::before */}
            <span className={`absolute h-0 w-0.5 right-0 top-0 transition-all duration-500 ease-out group-hover:h-full ${colorButton === "red" ? "bg-red-500" : "bg-sky-400"}`} aria-hidden="true" />
            <span className={`absolute left-0 bottom-0  transition-all duration-500 ease-out w-0.5 h-0 group-hover:h-full ${colorButton === "red" ? "bg-red-500" : "bg-sky-400"}`} aria-hidden="true" />

            {text}

            {/* span::after */}
            <span className={`absolute left-0 bottom-0 transition-all duration-500 ease-out w-0 h-0.5 group-hover:w-full ${colorButton === "red" ? "bg-red-500" : "bg-sky-400"}`} aria-hidden="true" />
            <span className={`absolute w-0 h-0.5 right-0 top-0 transition-all duration-500 ease-out group-hover:w-full ${colorButton === "red" ? "bg-red-500" : "bg-sky-400"}`} aria-hidden="true" />

        </button>
    )
}

export default Button