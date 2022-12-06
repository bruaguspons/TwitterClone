import { configureStore } from '@reduxjs/toolkit'
import { UserSlice } from './state/userSlice'

export default configureStore({
    reducer: {
        user: UserSlice.reducer
    }
})