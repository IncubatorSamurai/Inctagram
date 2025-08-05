import { usersApi } from '@/shared/api/users/usersApi'
import { postLikeApi } from '@/shared/api/post/likes/postLikeApi'

export type UpdateFollowingThunk =
  | ReturnType<typeof usersApi.util.updateQueryData>
  | ReturnType<typeof postLikeApi.util.updateQueryData>
