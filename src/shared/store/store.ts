import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import { appReducer, appSlice } from '@/shared/store/appSlice/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query API
    [appSlice.name]: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
