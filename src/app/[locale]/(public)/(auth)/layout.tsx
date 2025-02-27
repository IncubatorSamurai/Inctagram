import s from './styles.module.scss'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={s.container}>{children}</div>
}
