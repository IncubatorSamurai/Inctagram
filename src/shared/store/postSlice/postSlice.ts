import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  uploadedFiles: string[]
  step: number
}

const initialState: PostState = {
  uploadedFiles: [],
  step: 0,
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
    }),
    nextStep: create.reducer(state => {
      if (state.step === state.uploadedFiles.length - 1) return
      state.step = state.step + 1
    }),
    prevStep: create.reducer(state => {
      if (state.step === 0) return
      state.step = state.step - 1
    }),
  }),
  selectors: {
    selectUploadedFiles: state => state.uploadedFiles,
    selectStep: state => state.step,
  },
})

export const { allUploadedFiles, addFile, removeFile, clearFiles, prevStep, nextStep } =
  postSlice.actions
export const { selectUploadedFiles, selectStep } = postSlice.selectors
export const postReducer = postSlice.reducer
