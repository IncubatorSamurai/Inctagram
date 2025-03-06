'use client'

import { Link } from "@/i18n/routing";
import { useSignUpForm } from "@/shared/hooks/useSignUpForm";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Typography } from "@/shared/ui/typography";
import { AuthWidget } from "@/widgets/authWidget";
import { SignUpModal } from "./signUpModal/SignUpModal";
import s from './SignUp.module.scss'
import { PATH } from "@/shared/config/routes";

export const SignUpForm = () => {
  const {
    open,
    setOpen,
    isLoading,
    isError,
    register,
    handleSubmit,
    errors,
    disabled,
    onSubmit,
    value,
    reset,
    onChange,
    email,
  } = useSignUpForm();

  return (
    <>
      <Card className={s.root}>
        <div className={s.wrapper}>
          <Typography variant="h1" className={s.text}>
            Sign Up
          </Typography>
          <AuthWidget className={s.marginAuth}/>
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
                <p>
                  I agree to the <Link href={'/#'}>Terms of Service</Link> and {''}
                  <Link href={'/#'}>Privacy Policy</Link>
                </p>
              }
            />
            <Button fullWidth disabled={disabled || isLoading} className={s.sizeBtn}>
              {isLoading ? '...Loading' : 'Sign Up'}
            </Button>
          </form>
          <Typography variant="regular_text_14" className={s.padding}>
             Do you have an account?
          </Typography>
           <Button fullWidth variant="text" className={s.marginBtn}>
             <Link className={s.linkStyles} href={PATH.SIGNIN}>
               Sign In
             </Link>
          </Button>
        </div>
         <SignUpModal
          error={isError}
           email={email}
           open={open}
           onReset={reset}
           onChange={() => {
             setOpen(false)
           }}
        />
      </Card>
    </>
  );
};

