'use client'

import s from './Payments.module.scss'
import { PaymentsTable } from '@/shared/ui/table'
import { useGetMyPaymentsQuery } from '@/shared/api/payments/paymentsApi'
import { useMemo, useState } from 'react'
import { Pagination } from '@/shared/ui/pagination'

const Payments = () => {

  const { data: payments = [] } = useGetMyPaymentsQuery()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return payments.slice(start, start + itemsPerPage)
  }, [payments, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }
  return (
    <div className={s.payments}>
      <PaymentsTable payments={paginatedData} /> {}
      <Pagination
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalCount={payments.length}
        changeCurrentPage={handlePageChange}
        changeItemsPerPage={handleItemsPerPageChange}
      />
    </div>
  )
}

export default Payments
