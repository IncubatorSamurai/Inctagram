import { baseApi } from '@/shared/api/baseApi'
import {
  GetPostsByNameArgs,
  GetPostsByNameRespond,
  UploadPhotoRespond,
} from '@/shared/api/post/postApi.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadPhoto: build.mutation<UploadPhotoRespond, FormData>({
      query: formData => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData,
      }),
    }),
    getPostsByUserName: build.query<GetPostsByNameRespond, GetPostsByNameArgs>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
      // serializeQueryArgs: ({ endpointName }) => endpointName, // Кешируем по ключу запроса
      // merge: (currentCache, newPosts) => {
      //   currentCache.items.push(...newPosts.items) // Добавляем новые посты в кеш
      // },
      // forceRefetch: ({ currentArg, previousArg }) =>
      //   currentArg?.pageNumber !== previousArg?.pageNumber, // Запрещаем повторные запросы
    }),
  }),
})

export const { useUploadPhotoMutation, useGetPostsByUserNameQuery } = postApi
