import { CreateNewPasswordForm } from '@/features/auth'
import s from './CreateNewPasswordPage.module.scss'

export const CreateNewPasswordPage = () => {
  return (
    <div className={s.container}>
      <CreateNewPasswordForm />
    </div>
  )
}
