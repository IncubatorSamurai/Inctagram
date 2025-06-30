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
        const { nextCursor, page, pageSize, pagesCount, totalCount, prevCursor } = newItems

        Object.assign(currentCacheData, {
          nextCursor,
          page,
          pageSize,
          pagesCount,
          totalCount,
          prevCursor,
        })
      },
      keepUnusedDataFor: 0,
    }),
  }),
})

export const { useLazyGetPublicationsFollowersQuery } = pageHomeApi
