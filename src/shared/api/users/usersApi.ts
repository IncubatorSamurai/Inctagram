import { baseApi } from '@/shared/api/baseApi'
import {
  GetUsersResponse,
  GetUsersRequest,
  GetUserResponse,
  GetUserRequest,
  FollowRequest,
  unFollowRequest,
  Followers,
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
      invalidatesTags: ['User', 'Followers'],
    }),
    unfollow: builder.mutation<void, unFollowRequest>({
      query: ({ userId }) => ({
        url: `v1/users/follower/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User', 'Followers'],
    }),
    getFollowers: builder.query<Followers, GetUserRequest>({
      query: ({ userName }) => ({
        url: `v1/users/${userName}/followers`,
        method: 'GET',
      }),
      providesTags: ['Followers'],
    }),
  }),
})

export const {
  useLazyGetUsersQuery,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetFollowersQuery,
} = usersApi
