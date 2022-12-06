import React, { useState } from 'react'

function Input({ type, name, Icon, holder }) {
    const [focused, setFocused] = useState(null)
    return (
        <div className="my-5 mr-5 relative overflow-hidden" >
            <label htmlFor={name} className="sr-only">{name}</label>
            <span className="absolute inset-y-0 left-0 pl-3 inline-flex items-center pointer-events-none">
                <Icon className={`h-5 w-5 ${focused === 1 ? "text-sky-400" : "text-gray-400"}`} aria-hidden="true" />
            </span>
            <input type={type} name={name} id={name} placeholder={holder}
                className="form-input pl-11 w-full border-none bg-white bg-opacity-20 text-black placeholder-gray-400 focus:border-none focus:ring-0 outline-none"
                onFocus={() => setFocused(1)}
                onBlur={() => setFocused(null)}
            />
            <span className={`absolute bottom-0 right-0 h-0.5 bg-sky-400 transition-all duration-300 ease-in transform ${focused === 1 ? "w-full" : "w-0"}`} aria-hidden="true" />
        </div>
    )
}

export default Input