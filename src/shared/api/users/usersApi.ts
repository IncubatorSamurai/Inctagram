import { baseApi } from '@/shared/api/baseApi'
import {
  FollowRequest,
  GetUserRequest,
  GetUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  unFollowRequest,
  Followers,
  GetFollowingResponse,
  GetFollowRequest,
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

    getFollowers: builder.query<Followers, GetFollowRequest>({
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
    getFollowingByUserName: builder.query<GetFollowingResponse, GetFollowRequest>({
      query: ({ userName, ...params }) => ({
        url: `v1/users/${userName}/following`,
        params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search || ''}-${queryArgs.userName}`
      },
      merge: (currentCacheData, newItems, { arg }) => {
        if (arg.pageNumber === 1) return newItems
        return { ...newItems, items: [...currentCacheData.items, ...newItems.items] }
      },
      providesTags: ['Following'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useLazyGetFollowersQuery,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useLazyGetFollowingByUserNameQuery,
} = usersApi
