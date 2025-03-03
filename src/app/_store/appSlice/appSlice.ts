import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { setIsLoggedIn } = appSlice.actions
export const { selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer
