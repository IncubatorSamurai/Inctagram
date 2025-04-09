import { Steps } from '@/shared/enums'
import { Photo } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    files: [] as Photo[],
    step: 0 as Steps,
  },
  reducers: create => ({
    addFile: create.reducer<{ fileUrl: string; id: string; type: string }>((state, action) => {
      state.files.push({
        fileUrl: action.payload.fileUrl,
        id: action.payload.id,
        type: action.payload.type,
      })
    }),
    removeFiles: create.reducer(state => {
      state.files.map(({ fileUrl, croppedFileUrl, filteredFileUrl }) => {
        if (fileUrl) {
          URL.revokeObjectURL(fileUrl)
        }
        if (croppedFileUrl) {
          URL.revokeObjectURL(croppedFileUrl)
        }
        if (filteredFileUrl) {
          URL.revokeObjectURL(filteredFileUrl)
        }
      })
      state.files = []
      state.step = 0
    }),
    removeFile: create.reducer<{ id: string }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.id)

      if (index !== -1) {
        const file = state.files[index]

        if (file.fileUrl) {
          URL.revokeObjectURL(file.fileUrl)
        }
        if (file.croppedFileUrl) {
          URL.revokeObjectURL(file.croppedFileUrl)
        }
        if (file.filteredFileUrl) {
          URL.revokeObjectURL(file.filteredFileUrl)
        }
      }

      state.files.splice(index, 1)
    }),
    resetCropFile: create.reducer<{ file: Photo }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.file.id)

      if (index !== -1) {
        const croppedFileUrl = state.files[index].croppedFileUrl
        if (croppedFileUrl) {
          URL.revokeObjectURL(croppedFileUrl)
        }

        state.files[index] = {
          ...state.files[index],
          zoomInit: null,
          cropInit: null,
          aspectInit: null,
          croppedFileUrl: null,
        }
      }
    }),
    saveCropFile: create.reducer<{ file: Photo }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.file.id)

      if (index !== -1) {
        const croppedFileUrl = state.files[index].croppedFileUrl
        if (croppedFileUrl) {
          URL.revokeObjectURL(croppedFileUrl)
        }

        state.files[index] = {
          ...state.files[index],
          ...action.payload.file,
        }
      }
    }),
    addFilteredFiles: create.reducer<{ fileUrl: string; id: string }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.id)

      if (index !== -1) {
        const filteredFileUrl = state.files[index].filteredFileUrl

        if (filteredFileUrl) {
          URL.revokeObjectURL(filteredFileUrl)
        }

        state.files[index] = {
          ...state.files[index],
          filteredFileUrl: action.payload.fileUrl,
        }
      }
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
    selectStep: state => state.step,
    selectFiles: state => state.files,
  },
})

export const {
  addFile,
  prevStep,
  nextStep,
  addFilteredFiles,
  resetCropFile,
  saveCropFile,
  removeFiles,
  removeFile,
} = postSlice.actions
export const { selectStep, selectFiles } = postSlice.selectors
export const postReducer = postSlice.reducer
