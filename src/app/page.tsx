'use client'
import { Pagination } from '@/shared/ui/pagination/Pagination'
import { useState } from "react";


export default function BaseHome() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  
    const testHandlerChangeCurrentPage = (value: number) => {
        setCurrentPage(value)
        console.log(value);

    }

    const testHandlerChangeItemsPerPage = (value: number) => {
        console.log(value);
        setItemPerPage(value)
    }

    const requestTotalPageCount = 120 //начиная с 8 страниц появляются точки

   
    return (
        <div>
            BaseHome
            <Pagination
                changeCurrentPage={testHandlerChangeCurrentPage}
                changeItemsPerPage={testHandlerChangeItemsPerPage}
                currentPage={currentPage}
                totalCount={requestTotalPageCount}
                neighbours={1}
                pageSize={itemPerPage}>
            </Pagination>
        </div>
    )
}
