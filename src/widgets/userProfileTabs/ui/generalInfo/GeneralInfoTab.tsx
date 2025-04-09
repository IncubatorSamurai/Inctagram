'use client'
import { UploadUserAvatar } from '@/features/settings'
import { useGetProfileQuery } from '@/shared/api/profile/profileApi'

export const GeneralInfoTab = () => {
  const { data } = useGetProfileQuery()
  console.log(data?.lastName)
  return (
    <div>
      <UploadUserAvatar />
    </div>
  )
}
