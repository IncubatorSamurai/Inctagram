import {useMemo} from 'react'

type Props = {
    currentPage: number // Текущая страница
    pageItemsCount: number // Количество элементов на странице
    siblingCount?: number // Количество соседних страниц (по умолчанию 1)
    totalItemsCount: number // Общее количество элементов
}

export const DOTS = '...'

export const usePagination = ({
                                  currentPage,
                                  pageItemsCount,
                                  siblingCount = 1,
                                  totalItemsCount,
                              }: Props) => {
    return useMemo(() => {
        const range = (start: number, end: number) => {
            const length = end - start + 1
            return Array.from({length}, (_, idx) => idx + start)
        }
        const totalPageCount = Math.ceil(totalItemsCount / pageItemsCount)

        const totalPageNumbers = siblingCount + 5

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

            return [firstPageIndex, DOTS, ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)

            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }
    }, [totalItemsCount, pageItemsCount, siblingCount, currentPage])
}
