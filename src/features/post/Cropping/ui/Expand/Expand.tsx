import { Typography } from '@/shared/ui/typography'
import { CropIcon16x9 } from '@/shared/assets/icons/CropIcon16x9'
import { CropIcon1x1 } from '@/shared/assets/icons/CropIcon1x1'
import { CropIcon4x5 } from '@/shared/assets/icons/CropIcon4x5'
import { Button } from '@/shared/ui/button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './Expand.module.scss'

type Props = {
  getAspect: (aspect: number) => void
}

type AspectOption = {
  ratio: string
  value: number
  icon: React.ReactNode
}

export const Expand = ({ getAspect }: Props) => {
  const aspectOptions: AspectOption[] = [
    { ratio: '1:1', value: 1, icon: <CropIcon1x1 /> },
    { ratio: '4:5', value: 4 / 5, icon: <CropIcon4x5 /> },
    { ratio: '16:9', value: 16 / 9, icon: <CropIcon16x9 /> },
  ]

  return (
    <>
      {aspectOptions.map(option => (
        <DropdownMenu.Item asChild key={option.ratio}>
          <li>
            <Typography variant="h3" asChild>
              <Button variant="text" className={s.button} onClick={() => getAspect(option.value)}>
                {option.ratio} {option.icon}
              </Button>
            </Typography>
          </li>
        </DropdownMenu.Item>
      ))}
    </>
  )
}
