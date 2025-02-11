'use client'
import {Pagination} from '@/shared/ui/pagination/Pagination'
import {useState} from "react";


export default function BaseHome() {
    const [testV, setTestV] = useState(1)
    const handlTest = (value: number) => {
        console.log('valueTest: ', value)
        setTestV(value)
    }
    return (
        <div>
            BaseHome
            <Pagination
                totalItemsCount={10} // Общее количество элементов
                pageItemsCount={1} // Количество элементов на странице
                currentPage={testV} // Текущая страница
                siblingCount={1} // Количество соседних страниц (по умолчанию 1)
                changeCurrentPage={handlTest}
            ></Pagination>
        </div>
    )
}
