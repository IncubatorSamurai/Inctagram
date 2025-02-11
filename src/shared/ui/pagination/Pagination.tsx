'use client'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { usePagination, DOTS } from '@/shared/ui/pagination/hooks/usePagination'
import { useEffect } from 'react'
import s from './Pagination.module.scss'
type Props = {
  changeCurrentPage: (value: number) => void
  // changeItemsPerPage: (value: number) => void
  className?: string
  currentPage: number
  pageItemsCount: number
  siblingCount?: number
  totalItemsCount: number
}

export const Pagination = (props: Props) => {

  const {
    changeCurrentPage,
    // changeItemsPerPage,
    currentPage,
    pageItemsCount,
    siblingCount,
    totalItemsCount,
  } = props
  // const onChangeValue = (value: string) => {
  //   changeItemsPerPage(Number(value))
  // }
  const paginationRange = usePagination({
    currentPage,
    pageItemsCount,
    siblingCount,
    totalItemsCount,
  })
  const lastPage = paginationRange?.[paginationRange.length - 1]
  const firstPage = 1

  useEffect(() => {
    if (lastPage && currentPage > Number(lastPage)) {
      changeCurrentPage(Number(lastPage))
    }
  }, [changeCurrentPage, lastPage, currentPage])
  if (currentPage === 0 || (paginationRange && paginationRange.length < 1)) {
    return null
  }
  const onNext = () => {
    changeCurrentPage(currentPage + 1)
    console.log(currentPage + 1)
  }

  const onPrevious = () => {
    console.log(currentPage)
    changeCurrentPage(currentPage - 1)
    console.log(currentPage - 1)
  }

  return (
    <div>
      {/*//TODO change button on arrow and add className prev*/}
      <Button onClick={onPrevious} />

      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return DOTS
        }

        return (
          <li className={s.test} key={index} onClick={() => changeCurrentPage(Number(pageNumber))}>
            {pageNumber}
          </li>
        )
      })}
      {/*//TODO change button on arrow and add className next*/}
      <Button onClick={onNext} />
      <Typography>Показать Select на странице</Typography>
    </div>
  )
}
