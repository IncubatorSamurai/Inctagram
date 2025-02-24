import { CreateNewPasswordForm } from '@/features/auth'
import s from './CreateNewPassword.module.scss'

export const CreateNewPasswordPage = () => {
  return (
    <div className={s.container}>
      <CreateNewPasswordForm />
    </div>
  )
}
