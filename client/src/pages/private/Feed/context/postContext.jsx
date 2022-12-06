import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { useSelector } from "react-redux";

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState({})

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    const context = useContext(PostContext)
    if (context === undefined) {
        throw new Error('usePostContext must be used within a PostProvider')
    }
    return context
}