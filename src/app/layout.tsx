import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/app/_styles/ui/index.scss'

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { GoogleProviders, StoreProvider } from '@/app/_providers'

export const metadata: Metadata = {
  title: 'Inctagram',
  description: 'Inctagram',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html>
      <body>
        <GoogleProviders>
          <StoreProvider>{children}</StoreProvider>
        </GoogleProviders>
      </body>
    </html>
  )
}
