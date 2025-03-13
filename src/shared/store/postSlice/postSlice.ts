import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  uploadedFiles: string[]
}

const initialState: PostState = {
  uploadedFiles: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: create => ({
    allUploadedFiles: create.reducer((state, action: PayloadAction<string[]>) => {
      state.uploadedFiles = action.payload
    }),
    addFile: create.reducer((state, action: PayloadAction<{ fileUrl: string }>) => {
      state.uploadedFiles.push(action.payload.fileUrl)
    }),
    removeFile: create.reducer((state, action: PayloadAction<{ fileUrl: string }>) => {
      state.uploadedFiles = state.uploadedFiles.filter(file => file !== action.payload.fileUrl)
    }),
    clearFiles: create.reducer(state => {
      state.uploadedFiles = []
    })
  }),
  selectors: {
    selectUploadedFiles: state => state.uploadedFiles
  }
})

export const { allUploadedFiles, addFile, removeFile, clearFiles } = postSlice.actions
export const { selectUploadedFiles } = postSlice.selectors
export const postReducer = postSlice.reducer
