import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'
import { Button } from '@/shared/ui/button'
import { useAppDispatch } from '@/shared/hooks'
import { prevStep } from '@/shared/store/postSlice/postSlice'

export const SwitchStep = () => {
  const dispatch = useAppDispatch()

  const prev = () => {
    dispatch(prevStep())
  }

  return (
    <Button variant={'icon'} onClick={prev}>
      <ArrowIosBackIcon />
    </Button>
  )
}
