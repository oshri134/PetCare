import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../auth.reducer'

export const store = configureStore({
  reducer: {
      userData: userSlice,
  },
})