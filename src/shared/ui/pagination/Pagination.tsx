'use client'
import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'
import s from './Pagination.module.scss'
import { ArrowIosForwardIcon } from '@/shared/assets/icons/ArrowIosForwardIcon'
import { Typography } from './../typography/Typography';
import { SelectBox } from '../select';
import { useEffect } from 'react';
import { clsx } from 'clsx'
import { DOTS, usePagination } from './hook/usePagination';
import { SelectItem } from '../select/selectItem';


type Props = {
    changeCurrentPage: (value: number) => void
    changeItemsPerPage: (value: number) => void
    currentPage: number
    pageSize: number
    neighbours?: number
    totalCount: number

}

export const Pagination = ({ changeCurrentPage,
    changeItemsPerPage,
    currentPage,
    pageSize,
    neighbours,
    totalCount,
}: Props) => {

    const options = [{ id: '1', label: '10' }, { id: '2', label: '20' }, { id: '3', label: '30' }, { id: '4', label: '50' }, { id: '5', label: '100' },]

    const onChangeValue = (selectedId: string) => {
        const selectedOption = options.find(option => option.id === selectedId)
        changeItemsPerPage(Number(selectedOption?.label))
    }

    const paginationRange = usePagination({ currentPage, pageSize, neighbours, totalCount })
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
    }

    const onPrevious = () => {
        changeCurrentPage(currentPage - 1)
    }

    const classNames = {
        arrowBackward: clsx(s.arrow, currentPage === firstPage && s.disabled),
        arrowForward: clsx(s.arrow, s.rotateArrow, currentPage === lastPage && s.disabled),
        paginationContainer: clsx(s.pagination_container),
    }

    return (
        <div className={classNames.paginationContainer}>
            <button onClick={onPrevious} disabled={currentPage === firstPage} className={s.arrow}>
                <ArrowIosBackIcon />
            </button>

            {paginationRange?.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <div key={index} className={s.dots}>...</div>
                }

                return (
                    <li
                        tabIndex={0}
                        className={clsx(s.pagination_item, pageNumber === currentPage && s.selected)}
                        key={index}
                        onClick={() => changeCurrentPage(Number(pageNumber))}
                    >
                        {pageNumber}
                    </li>
                )
            })}
            <button onClick={onNext} disabled={currentPage === lastPage} className={s.arrow}>
                <ArrowIosForwardIcon />
            </button>
            <Typography className={s.selectWrapper}>
                Показать
            </Typography>
            <SelectBox
                defaultValue={options[0].id}
                onValueChange={onChangeValue}
            >
                {options.map(el=>(
                    <SelectItem key={el.id} value={el.id} className={s.item}>
                        {el.label}
                    </SelectItem>
                ))}
            </SelectBox>
            <Typography className={s.selectWrapper}>
                на странице
            </Typography>
        </div>
    )
}