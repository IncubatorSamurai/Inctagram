
import { Input } from "@/shared/ui/input"
import { Modal } from "@/shared/ui/modal"
import s from './FollowersModal.module.scss'
import { Item } from "@/shared/api/followers/followersApi.type"
import { Follower } from "../follower/Follower"





type FollowModalProps = {
  open: boolean
  fCount?: number
  followers?: Item[]
  onChange: (open: boolean) => void
}


export const FollowersModal = ({
  open,onChange,fCount,followers

}: FollowModalProps) => {

const count = fCount ?? 0

  return (
    <Modal
      open={open}
      title={`${count} Followers`}
      onOpenChange={onChange}
      className={s.modal}
    >
        <Input
          type="search"
          placeholder="Search"
          className={s.searchInput}
        />
      <div>
      {followers?.map((el)=><Follower key={el.id} avatarSrc={el.avatars[0].url} profileUrl={el.userName}/>)}
      </div>
    </Modal>
  )
}