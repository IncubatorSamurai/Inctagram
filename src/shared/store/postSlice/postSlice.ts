import { Photo } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'
import { AvatarProfile } from '@/shared/api/post/postApi.types'

const revokeObjectURLs = (file: Photo) => {
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

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    files: [] as Photo[],
    avatar: {
      id: '',
      fileUrl: '',
      type: '',
      croppedFileUrl: null,
      zoomInit: null,
      cropInit: null,
    } as AvatarProfile,
  },
  reducers: create => ({
    addFile: create.reducer<{ fileUrl: string; id: string; type: string }>((state, action) => {
      state.files.push({
        fileUrl: action.payload.fileUrl,
        id: action.payload.id,
        type: action.payload.type,
      })
    }),
    addAvatar: create.reducer<{ fileUrl: string; id: string; type: string }>((state, action) => {
      state.avatar = {
        fileUrl: action.payload.fileUrl,
        id: action.payload.id,
        type: action.payload.type,
      }
    }),
    removeAvatar: create.reducer(state => {
      if (state.avatar?.fileUrl) {
        URL.revokeObjectURL(state.avatar.fileUrl)
      }
      state.avatar = {} as AvatarProfile
    }),
    removeFiles: create.reducer(state => {
      state.files.forEach(file => revokeObjectURLs(file))
      state.files = []
    }),
    removeFile: create.reducer<{ id: string }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.id)

      if (index !== -1) {
        revokeObjectURLs(state.files[index])
        state.files.splice(index, 1)
      }
    }),
    resetCropFile: create.reducer<{ file: Photo }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.file.id)

      if (index !== -1) {
        const file = state.files[index]

        if (file.croppedFileUrl) {
          URL.revokeObjectURL(file.croppedFileUrl)
        }
        if (file.filteredFileUrl) {
          URL.revokeObjectURL(file.filteredFileUrl)
        }

        state.files[index] = {
          ...state.files[index],
          zoomInit: null,
          cropInit: null,
          aspectInit: null,
          croppedFileUrl: null,
          filteredFileUrl: null,
        }
      }
    }),
    saveCropFile: create.reducer<{ file: Photo }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.file.id)

      if (index !== -1) {
        const file = state.files[index]

        if (file.croppedFileUrl) {
          URL.revokeObjectURL(file.croppedFileUrl)
        }
        if (file.filteredFileUrl) {
          URL.revokeObjectURL(file.filteredFileUrl)
        }

        state.files[index] = {
          ...file,
          ...action.payload.file,
        }
      }
    }),
    addFilteredFiles: create.reducer<{ filteredFileUrl: string; id: string }>((state, action) => {
      const index = state.files.findIndex(file => file.id === action.payload.id)

      if (index !== -1) {
        const file = state.files[index]

        if (file.filteredFileUrl) {
          URL.revokeObjectURL(file.filteredFileUrl)
        }

        state.files[index] = {
          ...file,
          filteredFileUrl: action.payload.filteredFileUrl,
        }
      }
    }),
  }),
  selectors: {
    selectFiles: state => state.files,
    selectAvatar: state => state.avatar,
  },
})

export const {
  addFile,
  addFilteredFiles,
  resetCropFile,
  saveCropFile,
  removeFiles,
  removeFile,
  addAvatar,
  removeAvatar,
} = postSlice.actions
export const { selectFiles, selectAvatar } = postSlice.selectors
export const postReducer = postSlice.reducer
