import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PostState = {
  uploadedFiles: string[]
}

const initialState: PostState = {
  uploadedFiles: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  selectors: {
    selectUploadedFiles: state => state.uploadedFiles,
  },
  reducers: {
    allUploadedFiles: (state, action: PayloadAction<string[]>) => {
      state.uploadedFiles = action.payload
    },

    addFile: (state, action: PayloadAction<{ fileUrl: string }>) => {
      state.uploadedFiles.push(action.payload.fileUrl)
    },

    removeFile: (state, action: PayloadAction<{ fileUrl: string }>) => {
      state.uploadedFiles = state.uploadedFiles.filter(file => file !== action.payload.fileUrl)
    },

    clearFiles: state => {
      state.uploadedFiles = []
    },
  },
})

export const { addFile, removeFile, clearFiles, allUploadedFiles } = postSlice.actions

export const { selectUploadedFiles } = postSlice.selectors

export const postReducer = postSlice.reducer
