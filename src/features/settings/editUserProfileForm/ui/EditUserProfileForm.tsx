'use client'

import { Input } from '@/shared/ui/input'
import s from './EditUserProfileForm.module.scss'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/shared/api/profile/profileApi'
import { EditProfileForm, editProfileSchema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TextArea } from '@/shared/ui/textarea'
import { DatePicker } from '@/shared/ui/datepicker'
import { parse, isValid } from 'date-fns'
import { Button } from '@/shared/ui/button'
import { toast, ToastContainer } from 'react-toastify'
import { Typography } from '@/shared/ui/typography'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { requiredInputs } from '../model/requiredInputs'
import { PATH } from '@/shared/config/routes'
import {
  clearProfileStorage,
  getProfileFromStorage,
  saveProfileToStorage,
} from '@/shared/utils/ProfileStorge'

export const EditUserProfileForm = () => {
  const t = useTranslations('profile.generalInfo')
  const [localDate, setLocalDate] = useState<Date | undefined>(undefined)

  const inputs = requiredInputs(t)

  const { data, isLoading, isSuccess } = useGetProfileQuery()
  const [updateProfile, { isLoading: isUpdateProfile }] = useUpdateProfileMutation()

  const { register, handleSubmit, formState, reset, setValue, getValues } =
    useForm<EditProfileForm>({
      resolver: zodResolver(editProfileSchema),
      mode: 'onChange',
    })
  const { errors, isValid: isFormValid, isDirty } = formState

  useEffect(() => {
    const localData = getProfileFromStorage()

    if (localData) {
      reset(localData)

      return
    }
    if (isSuccess && data) {
      const { userName, firstName, lastName, dateOfBirth, aboutMe } = data
      const formData = {
        name: userName || '',
        firstName: firstName || '',
        lastName: lastName || '',
        birthDate: dateOfBirth ? new Date(dateOfBirth) : undefined,
        textarea: aboutMe || '',
      }
      reset(formData, { keepDirty: false, keepValues: true })
      setLocalDate(formData.birthDate)
    }
  }, [isSuccess, data, reset])

  const onSubmit = (form: EditProfileForm) => {
    updateProfile({
      userName: form.name,
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.birthDate?.toISOString() || '',
      aboutMe: form.textarea || '',
    })
      .unwrap()
      .then(() => {
        toast.success('Your settings are saved')
        clearProfileStorage()
      })
      .catch(() => {
        toast.error('Error! Server is not available!')
      })
  }
  const onLink = () => {
    const form = getValues()
    saveProfileToStorage(form)
  }
  const handleDateChange = (dateStr: string | undefined) => {
    if (!dateStr) return

    const parsed = parse(dateStr, 'dd/MM/yyyy', new Date())

    if (!isValid(parsed)) return
    setLocalDate(parsed)
    console.log('birthDate:', getValues('birthDate'))
    //сохраняем дату в react-hook-form
    setValue('birthDate', parsed, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  const isButtonDisabled = !isFormValid || isUpdateProfile || !isDirty

  if (isLoading) return <h1>Loading...</h1>

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      {inputs.map((input, i) => (
        <Input
          className={s.box}
          key={i}
          isRequired={true}
          label={input.label}
          {...register(input.value)}
          error={errors[input.value]?.message}
        />
      ))}
      <div className={s.box}>
        <DatePicker onChange={handleDateChange} value={localDate} title={t('birthDate')} />
        {errors.birthDate?.message && (
          <Typography variant="error">
            {t('dateError')}
            <Link className={s.link} href={PATH.PRIVACY_POLICY} onClick={onLink}>
              Privacy Policy
            </Link>
          </Typography>
        )}
      </div>
      <TextArea className={s.box} title={t('about')} {...register('textarea')} />
      <Button className={s.button} disabled={isButtonDisabled}>
        {t('btn')}
      </Button>
      <ToastContainer />
    </form>
  )
}
