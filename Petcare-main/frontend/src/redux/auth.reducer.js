import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      console.log(userData)
      Object.keys(userData).forEach(x => {
        state[x] = userData[x]
      })
      state.isAuthenticated = true;
    },
    logout: (state) => {
      Object.keys(state).forEach(x => {
        if (x !== 'isAuthenticated')
          delete state[x]
      })
      state.isAuthenticated = false;
    },

  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer