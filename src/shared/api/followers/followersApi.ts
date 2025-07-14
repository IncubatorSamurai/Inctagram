import { baseApi } from "../baseApi";
import { Followers, UserName } from "./followersApi.type";

export const followersApi = baseApi.injectEndpoints({
    endpoints: build => ({
      getFollowers: build.query<Followers, UserName>({
        query: ({name}) => ({
            url: `v1/users/${name}/followers`,
            method: 'GET'
        })
      }) 
    })
})

export const {useGetFollowersQuery} = followersApi