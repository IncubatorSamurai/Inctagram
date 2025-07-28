import { baseApi } from '@/shared/api/baseApi'
import {
  GetUsersResponse,
  GetUsersRequest,
  GetUserResponse,
  GetUserRequest,
  FollowRequest,
  unFollowRequest,
  Followers,
  GetFollowersRequest,
} from './usersApi.types'

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: args => ({
        url: 'v1/users',
        params: { ...args },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search || ''}`
      },
      merge: (currentCacheData, newItems, { arg }) => {
        if (arg.pageNumber === 1) return newItems
        return { ...newItems, items: [...currentCacheData.items, ...newItems.items] }
      },
    }),
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      query: ({ userName }) => ({
        url: `v1/users/${userName}`,
      }),
      providesTags: ['User'],
    }),
    follow: builder.mutation<void, FollowRequest>({
      query: payload => ({
        url: 'v1/users/following',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    unfollow: builder.mutation<void, unFollowRequest>({
      query: ({ userId }) => ({
        url: `v1/users/follower/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getFollowers: builder.query<Followers, GetFollowersRequest>({
      query: args => ({
        url: `v1/users/${args.userName}/followers`,
        method: 'GET',
        params: { ...args },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search || ''}-${queryArgs.userName}`
      },
      merge: (currentCacheData, newItems, { arg }) => {
        if (!arg.cursor) return newItems
        return { ...newItems, items: [...currentCacheData.items, ...newItems.items] }
      },
      providesTags: ['Followers'],
    }),
  }),
})

export const {
  useLazyGetUsersQuery,
  useLazyGetFollowersQuery,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetFollowersQuery,
} = usersApi
