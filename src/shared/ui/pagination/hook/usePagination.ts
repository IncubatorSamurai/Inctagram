import { useMemo } from "react"

type Props = {
    currentPage: number //текущая страница
    pageSize: number // количество элементов на странице
    neighbours?: number // количество соседей справа и слева от активной страницы
    totalCount: number //общее количество элементов в БД
}
export const DOTS = '...' 
export const usePagination = ({ currentPage, pageSize, totalCount, neighbours = 1 }: Props) => {
    return useMemo(() => {
        const range = (start: number, end: number) => {
            const length = end - start + 1
            return Array.from({ length }, (_, idx) => idx + start)
        }
        const totalPageCount = Math.ceil(totalCount / pageSize)

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        const totalPageNumbers = neighbours + 5

        const leftNeighboursIndex = Math.max(currentPage - neighbours, 1)
        const rightNeighboursIndex = Math.min(currentPage + neighbours, totalPageCount)

        const shouldShowLeftDots = leftNeighboursIndex > 2
        const shouldShowRightDots = rightNeighboursIndex < totalPageCount - 2


        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 2 + 3 * neighbours
            const leftRange = range(1, leftItemCount)
            return [...leftRange, DOTS, totalPageCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 2 + 3 * neighbours
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
            return [1, DOTS, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftNeighboursIndex, rightNeighboursIndex)
            return [1, DOTS, ...middleRange, DOTS, totalPageCount]
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftNeighboursIndex, rightNeighboursIndex)

            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }

    }, [totalCount, pageSize, neighbours, currentPage])
}







