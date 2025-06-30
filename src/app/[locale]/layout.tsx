import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ReactNode } from 'react'
import { locales } from '@/shared/types/locale'
import { Header } from '@/widgets/header'
import { SocketProvider } from '@/app/_providers'
import s from './layout.module.scss'
import LayoutLoggedIn from '@/app/_providers/layoutLoggedIn/layoutLoggedIn'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/app/_providers/AuthProvider/AuthProvider'

export default async function LocaleLayout({
  children,
  params,
  modal,
}: {
  children: ReactNode
  params: { locale: string }
  modal: ReactNode
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as locales)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <SocketProvider>
          <Header headerTitle={'Inctagram'} />
          <div className={s.container}>
            <LayoutLoggedIn>
              {children} <ToastContainer position="bottom-left" />
            </LayoutLoggedIn>
          </div>
          {modal}
        </SocketProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
