'use client'

import { Link } from '@/i18n/routing'
import { useSignUpForm } from '@/shared/hooks/useSignUpForm'
import { Button } from '@/shared/ui/button'

import { Checkbox } from '@/shared/ui/checkbox'
import { Input } from '@/shared/ui/input'

import s from './SignUp.module.scss'
import { PATH } from '@/shared/config/routes'
import { EmailSentModal } from '@/features/auth'
import { useTranslations } from 'next-intl'
import { Typography } from '@/shared/ui/typography'

export const SignUpForm = () => {
  const {
    isLoading,
    register,
    handleSubmit,
    errors,
    isDisabled,
    onSubmit,
    value,
    onChange,
    email,
    open,
    setOpen,
  } = useSignUpForm()

  const tAuth = useTranslations('auth')
  const tCommon = useTranslations('common')

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
        <Input
          label="Name"
          type="name"
          placeholder="User name"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="email@gmail.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="******************"
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />

        <Input
          label="Password confirmation"
          type="password"
          placeholder="******************"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Checkbox
          className={s.checkbox}
          id="check"
          {...register('agree')}
          onChange={onChange}
          checked={value}
          labelForText="small_text"
          label={
            <Typography variant={'small_text'}>
              {tCommon('agreementMsg')}{' '}
              <Link href={PATH.TERMS_OF_SERVICE}>{tAuth('termsOfService')}</Link> {tCommon('and')}
              <Link href={PATH.PRIVACY_POLICY}> {tAuth('privacyPolicy')}</Link>
            </Typography>
          }
          error={errors.agree?.message}
        />
        <Button fullWidth disabled={isDisabled} className={s.sizeBtn}>
          {isLoading ? tCommon('loading') : tAuth('signUp')}
        </Button>
        <EmailSentModal email={email} open={open} onChange={setOpen} />
      </form>
    </>
  )
}
