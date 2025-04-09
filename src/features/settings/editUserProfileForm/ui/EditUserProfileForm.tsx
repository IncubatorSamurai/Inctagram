'use client'
import { Input } from '@/shared/ui/input'
import s from './EditUserProfileForm.module.scss'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/shared/api/profile/profileApi'
import { EditProfileForm, editProfileSchema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export const EditUserProfileForm = () => {
  const { data, isLoading, isSuccess } = useGetProfileQuery()
  const [send] = useUpdateProfileMutation()
  const { register, handleSubmit, formState, reset } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  })
  useEffect(() => {
    if (isSuccess) {
      const { userName, firstName, lastName } = data
      reset({ name: userName, firstName, lastName })
    }
  }, [isSuccess])

  //   setValue('name', data?.userName || '')
  const onSubmit = (e: EditProfileForm) => {
    send({
      userName: e.name,
      firstName: e.firstName,
      lastName: e.lastName,
      city: '',
      country: '',
      region: '',
      dateOfBirth: '',
      aboutMe: 'Brief bio here',
    })
    console.log(e)
  }
  const { errors } = formState
  console.log(errors)
  if (isLoading) return <h1>Loading...</h1>

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Username" {...register('name')} />
      <Input label="Username" {...register('firstName')} />
      <Input label="Username" {...register('lastName')} />
      <button>2</button>
    </form>
  )
}
