import s from './styles.module.scss'

export default function Layout({
 children,
 modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return <div className={s.container}>{modal}
    {children}</div>
}
