import { createSlice } from "@reduxjs/toolkit"

const initValue = {
    userName: '',
    bio: '',
    email: '',
    image: '',
    token: '',
    id: ''
}

export const UserSlice = createSlice({
    name: "User",
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : initValue,
    reducers: {
        createUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload
        },
        updateUser: (state, action) => {
            const data = { ...state, ...action.payload }
            localStorage.setItem('user', JSON.stringify(data))
            return data
        },
        resetUser: (state, action) => {
            localStorage.removeItem('user')
            return initValue
        }
    }
})

export const { createUser, updateUser, resetUser } = UserSlice.actions