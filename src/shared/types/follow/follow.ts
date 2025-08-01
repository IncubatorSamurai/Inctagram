import { usersApi } from '@/shared/api/users/usersApi'

export type UpdateFollowingThunk = ReturnType<typeof usersApi.util.updateQueryData>
