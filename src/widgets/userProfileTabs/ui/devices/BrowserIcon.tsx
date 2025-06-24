import { FirefoxIcon } from '@/shared/assets/icons/FirefoxIcon'
import { ChromeIcon } from '@/shared/assets/icons/ChromeIcon'
import { YandexIcon } from '@/shared/assets/icons/YandexIcon'
import { BraveIcon } from '@/shared/assets/icons/BraveIcon'
import { MicrosoftEdgeIcon } from '@/shared/assets/icons/MicrosoftEdgeIcon'
import { ExplorerIcon } from '@/shared/assets/icons/ExplorerIcon'
import { OperaIcon } from '@/shared/assets/icons/OperaIcon'

type Browser = {
  browser: string | undefined
}

export const BrowserIcon = ({ browser }: Browser) => {
  return (
    <div>
      {browser === 'Chrome' && <ChromeIcon />}
      {browser === 'Opera' && <OperaIcon />}
      {browser === 'Edge' && <MicrosoftEdgeIcon />}
      {browser === 'FireFox' && <FirefoxIcon />}
      {browser === 'Yandex' && <YandexIcon />}
      {browser === 'Uc Browser' && <FirefoxIcon />}
      {browser === 'Brave' && <BraveIcon />}
      {browser === 'Explorer' && <ExplorerIcon />}
    </div>
  )
}
