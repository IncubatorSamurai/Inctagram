import { createSlice } from '@reduxjs/toolkit'

export type Photo = {
  id?: string
  fileUrl: string
  editedFileUrl?: string | null

  zoomInit?: number | null
  cropInit?: { x: number; y: number } | null
  aspectInit?: number | null
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    uploadedFiles: [] as string[],
    croppedFiles: [] as string[],
    files: [] as Photo[],
    step: 0,
  },
  reducers: create => ({
    allUploadedFiles: create.reducer<string[]>((state, action) => {
      state.uploadedFiles = action.payload
    }),
    allCroppedFiles: create.reducer<string[]>((state, action) => {
      state.croppedFiles = action.payload
    }),
    addFile: create.reducer<{ fileUrl: string }>((state, action) => {
      state.uploadedFiles.push(action.payload.fileUrl)

      state.files.push({
        fileUrl: action.payload.fileUrl,
        id: `a${action.payload.fileUrl}`,
      })
    }),
    removeFile: create.reducer<{ fileUrl: string }>((state, action) => {
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
    resetCropping: create.reducer<{ file: Photo }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.file.id)

      if (index !== -1) {
        const editedFileUrl = state.files[index].editedFileUrl
        if (editedFileUrl) {
          URL.revokeObjectURL(editedFileUrl)
        }

        state.files[index] = {
          ...state.files[index],
          zoomInit: null,
          cropInit: null,
          aspectInit: null,
          editedFileUrl: null,
        }
      }
    }),
    saveCropFile: create.reducer<{ file: Photo; croppedFileUrl: string | null }>(
      (state, action) => {
        const index = state.files.findIndex(file => file.id === action.payload.file.id)

        if (index !== -1) {
          const oldEditedFileUrl = state.files[index].editedFileUrl
          if (oldEditedFileUrl) {
            URL.revokeObjectURL(oldEditedFileUrl)
          }

          state.files[index] = {
            ...state.files[index],
            ...action.payload.file,
            editedFileUrl: action.payload.croppedFileUrl,
          }
        }
      }
    ),
  }),
  selectors: {
    selectUploadedFiles: state => state.uploadedFiles,
    selectStep: state => state.step,
    selectCroppedFiles: state => state.croppedFiles,
    selectFiles: state => state.files,
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
  resetCropping,
  saveCropFile,
} = postSlice.actions
export const { selectUploadedFiles, selectStep, selectFiles, selectCroppedFiles } =
  postSlice.selectors
export const postReducer = postSlice.reducer
