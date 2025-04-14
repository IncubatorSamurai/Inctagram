'use client'
import { Input } from '@/shared/ui/input'
import s from './EditUserProfileForm.module.scss'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/shared/api/profile/profileApi'
import { EditProfileForm, editProfileSchema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Calendar } from '@/shared/ui/datepicker/calendar'
import { DatePicker } from '@/shared/ui/datepicker'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { format } from 'date-fns'
import { CalendarOutlineIcon } from '@/shared/assets/icons/CalendarOutlineIcon'
import { DataPiker } from './DataPiker/DataPiker'
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
  }
  const { errors } = formState
  console.log(errors)
  const values = [
    {
      label: 'Username',
      value: 'name',
    },
    {
      label: 'firstName',
      value: 'firstName',
    },
    {
      label: 'lastName',
      value: 'lastName',
    },
  ]

  if (isLoading) return <h1>Loading...</h1>

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      {values.map((value, i) => (
        <Input key={i} label={value.label} {...register(value.value as any)} />
      ))}
      <DataPiker />

      {/* <Input label="Username*" {...register('name')} />
      <Input label="First Name*" {...register('firstName')} />
      <Input label="Last Name*" {...register('lastName')} /> */}
      {/* <button>2</button> */}
    </form>
  )
}
