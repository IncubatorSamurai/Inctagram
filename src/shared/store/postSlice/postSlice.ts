import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PostState {
  uploadedFiles: string[]
  croppedFiles: string[]
  step: number
}

const initialState: PostState = {
  uploadedFiles: [],
  croppedFiles: [],
  step: 0,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: create => ({
    allUploadedFiles: create.reducer((state, action: PayloadAction<string[]>) => {
      state.uploadedFiles = action.payload
    }),
    allCroppedFiles: create.reducer((state, action: PayloadAction<string[]>) => {
      state.croppedFiles = action.payload
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
    selectCroppedFiles: state => state.croppedFiles,
  },
})

export const {
  allUploadedFiles,
  allCroppedFiles,
  addFile,
  removeFile,
  clearFiles,
  prevStep,
  nextStep,
} = postSlice.actions
export const { selectUploadedFiles, selectStep, selectCroppedFiles } = postSlice.selectors
export const postReducer = postSlice.reducer
