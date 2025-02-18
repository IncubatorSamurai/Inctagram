import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'
import s from './Table.module.scss'
import clsx from 'clsx'
import { Typography } from '../typography'

export const Root = forwardRef<ComponentRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...props }, ref) => {
    const classNames = {
      container: s.container,
      table: clsx(s.table, className),
    }

    return (
      <Typography asChild variant="regular_text_14">
        <div className={classNames.container}>
          <table className={classNames.table} ref={ref} {...props} />
        </div>
      </Typography>
    )
  }
)

Root.displayName = 'Root'

export const TableHead = forwardRef<ComponentRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ ...props }, ref) => {
    return <thead ref={ref} {...props} />
  }
)

TableHead.displayName = 'TableHead'

export const TableBody = forwardRef<ComponentRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ ...props }, ref) => {
    return <tbody ref={ref} {...props} />
  }
)

TableBody.displayName = 'TableBody'

export const TableRow = forwardRef<ComponentRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ ...props }, ref) => {
    return <tr ref={ref} {...props} className={s.row} />
  }
)

TableRow.displayName = 'TableRow'

export const TableHeadCell = forwardRef<ComponentRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...props }, ref) => {
    const classNames = {
      headCell: clsx(s.headCell, className),
    }

    return (
      <th className={classNames.headCell} ref={ref} {...props}>
        <span>{children}</span>
      </th>
    )
  }
)

TableHeadCell.displayName = 'TableHeadCell'

export const TableCell = forwardRef<ComponentRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...props }, ref) => {
    const classNames = {
      cell: clsx(s.cell, className),
    }

    return <td className={classNames.cell} ref={ref} {...props} />
  }
)

TableCell.displayName = 'TableCell'

export const TableEmpty = ({ className }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <Typography variant="h2" className={clsx(s.empty, className)}>
      Oops! This place looks empty!
    </Typography>
  )
}

TableEmpty.displayName = 'TableEmpty'
