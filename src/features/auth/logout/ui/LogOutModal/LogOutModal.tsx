import { DialogClose, Modal } from '@/shared/ui/modal'
import s from './LogOutModal.module.scss'

import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
type LogOut={
  trigger: React.ReactNode
  email:string
  logOut : () => void
}
export const LogOutModal = ({logOut, email,trigger}:LogOut) => {
  return (
    <Modal title="Log out" className={s.LogOutModal} trigger={trigger}>
      <div className={s.LogOutModalContainer}>
        <Typography variant="regular_text_14">
          Are you really want to log out of your account  {email}?
        </Typography>
        <div className={s.LogOutModalBtn}>
          <DialogClose asChild>
            <Button variant="primary" onClick={logOut} fullWidth>
              Yes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary" fullWidth >
              No
            </Button>
          </DialogClose>
        </div>
      </div>
    </Modal>
  )
}