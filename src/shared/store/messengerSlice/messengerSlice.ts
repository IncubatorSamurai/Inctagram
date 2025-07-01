import { createSlice } from '@reduxjs/toolkit'

export const messengerSlice = createSlice({
  name: 'messenger',
  initialState: {
    selectedUserId: null as number | null,
    selectedUserName: '',
    selectedUserAvatar: '',
  },
  selectors: {
    selectSelectedUserId: state => state.selectedUserId,
    selectSelectedUserName: state => state.selectedUserName,
    selectSelectedUserAvatar: state => state.selectedUserAvatar,
  },
  reducers: create => ({
    setSelectedUser: create.reducer<{
      id: number
      name: string
      avatar: string
    }>((state, action) => {
      state.selectedUserId = action.payload.id
      state.selectedUserName = action.payload.name
      state.selectedUserAvatar = action.payload.avatar
    }),

    clearSelectedUser: create.reducer(state => {
      state.selectedUserId = null
      state.selectedUserName = ''
      state.selectedUserAvatar = ''
    }),
  }),
})

export const { setSelectedUser, clearSelectedUser } = messengerSlice.actions
export const { selectSelectedUserId, selectSelectedUserName, selectSelectedUserAvatar } =
  messengerSlice.selectors
export const messengerReducer = messengerSlice.reducer
