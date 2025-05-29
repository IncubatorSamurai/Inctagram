import { baseApi } from '@/shared/api/baseApi'
import {
  HomePagePostsRespond,
  PublicationsFollowersArgs,
} from '@/shared/api/pageHome/pageHomeApi.types'

export const pageHomeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicationsFollowers: builder.query<HomePagePostsRespond, PublicationsFollowersArgs>({
      query: ({ ...params }) => ({ url: `v1/home/publications-followers`, params }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, newItems) => {
        currentCacheData.items.push(...newItems.items)
      },
    }),
  }),
})

export const { useGetPublicationsFollowersQuery } = pageHomeApi
